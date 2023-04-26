import axios from 'axios';
import { DEV, API_URL_DEVELOPMENT, API_URL_PRODUCTION } from '@env';

const api = axios.create({
  baseURL: `${ DEV === 'yes' ? API_URL_DEVELOPMENT : API_URL_PRODUCTION }`,
  withCredentials: true,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
