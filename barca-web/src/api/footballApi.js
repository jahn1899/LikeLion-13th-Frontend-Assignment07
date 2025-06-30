import axios from 'axios';

const BASE_URL = 'https://api-football-v1.p.rapidapi.com/v3';
const HEADERS = {
  'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
  'X-RapidAPI-Host': import.meta.env.VITE_API_HOST,
};

export const fetchBarcelonaSquad = async () => {
  const response = await axios.get(`${BASE_URL}/players`, {
    params: { team: 529, season: 2023 },
    headers: HEADERS,
  });
  return response.data.response;
};
