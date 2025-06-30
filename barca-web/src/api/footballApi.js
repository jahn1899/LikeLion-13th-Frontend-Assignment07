import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
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
