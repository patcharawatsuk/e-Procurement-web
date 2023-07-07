import axios from 'axios';

const baseUrl = `${process.env.NEXT_PUBLIC_API_ENDPOINT}`;

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* This is a fake API which in Next.js */
const baseFakeApiUrl = `${process.env.NEXT_PUBLIC_FAKE_API_ENDPOINT}`;
const fakeApi = axios.create({
  baseURL: baseFakeApiUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
export { fakeApi };