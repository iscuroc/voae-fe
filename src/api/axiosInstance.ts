import axios from 'axios';
import useAuth from './useAuth';

const axiosInstance = axios.create({
  // process.env.URL_BACK
  baseURL: import.meta.env.URL_BACK,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const { accessToken } = useAuth();
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;