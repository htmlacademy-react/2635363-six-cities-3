import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://15.design.htmlacademy.pro';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (token?: string | null): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  if (token) {
    api.defaults.headers['X-Token'] = token;
  }

  api.interceptors.request.use((config) => {
    const tokenFromStorage = localStorage.getItem('six-cities-token');
    if (tokenFromStorage && config.headers) {
      config.headers['X-Token'] = tokenFromStorage;
    }
    return config;
  });

  return api;
};
