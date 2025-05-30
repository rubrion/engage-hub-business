import axios from 'axios';

import { debugLog } from '../utils/debugControl';

const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? ''
    : import.meta.env.VITE_RUBRION_API_URL;

debugLog('API_BASE_URL set to:', API_BASE_URL);

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
