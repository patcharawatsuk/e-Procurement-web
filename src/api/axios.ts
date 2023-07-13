import axios from 'axios';

const baseUrl = `${process.env.NEXT_PUBLIC_API_ENDPOINT}`;

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;