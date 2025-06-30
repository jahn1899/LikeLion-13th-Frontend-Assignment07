import { useQuery } from '@tanstack/react-query';
import { fetchBarcelonaSquad } from '../api/footballApi';
import ClipLoader from 'react-spinners/ClipLoader';
import styled from 'styled-components';

const Page = styled.div`
  background-color: #0e103d;
  min-height: 100vh;
  padding: 2rem;
  color: #ffffff;
  font-family: 'Segoe UI', sans-serif;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #ffcc00;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);  /* 태블릿 이하 2줄 */
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr; /* 모바일 1줄 */
  }
`;


const Card = styled.div`
  background-color: #1c1e4f;
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.03);
  }
`;

const PlayerImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid #ffcc00;
  margin-bottom: 0.5rem;
`;

const PlayerName = styled.h3`
  margin: 0.3rem 0;
  font-size: 1.2rem;
  color: #ffffff;
`;

const Info = styled.p`
  margin: 0.2rem 0;
  font-size: 0.95rem;
  color: #bbbbbb;
`;

function BarcelonaSquad() {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['barcelonaSquad'],
    queryFn: fetchBarcelonaSquad,
    staleTime: 1000 * 60,
  });

  if (isLoading || isFetching) {
    return (
      <Page>
        <ClipLoader color="#ffcc00" size={50} />
      </Page>
    );
  }

  if (error) {
    return <Page>데이터를 불러오는 데 실패했습니다 😢</Page>;
  }

  return (
    <Page>
      <Title>FC 바르셀로나 선수 명단 (2023)</Title>
      <Grid>
        {data.map((playerInfo) => {
          const player = playerInfo.player;
          const position = playerInfo.statistics[0]?.games?.position || '정보 없음';

          return (
            <Card key={player.id}>
              <PlayerImage src={player.photo} alt={player.name} />
              <PlayerName>{player.name}</PlayerName>
              <Info>포지션: {position}</Info>
              <Info>나이: {player.age}</Info>
              <Info>국적: {player.nationality}</Info>
            </Card>
          );
        })}
      </Grid>
    </Page>
  );
}

export default BarcelonaSquad;
