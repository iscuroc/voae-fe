import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://ruta del Backend.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;