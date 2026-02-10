import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://15.design.htmlacademy.pro';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('six-cities-token');

    if (token && config.headers) {
      config.headers['X-Token'] = token;
    }

    return config;
  });

  return api;
};
