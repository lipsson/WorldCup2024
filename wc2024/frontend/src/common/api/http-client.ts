import axios from 'axios';

const baseURL = 'http://localhost:3000/api/worldcup';
const httpClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { httpClient };
