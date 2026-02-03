import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

const BASE_URL = 'https://fakestoreapi.com';
const TIMEOUT = 10000;

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.code === 'ECONNABORTED') {
      return Promise.reject(new Error('Request timeout. Please try again.'));
    }
    
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 401:
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }
          return Promise.reject(new Error('Session expired. Please login again.'));
        case 404:
          return Promise.reject(new Error('Resource not found.'));
        case 500:
          return Promise.reject(new Error('Server error. Please try again later.'));
        default:
          return Promise.reject(new Error('An unexpected error occurred.'));
      }
    }
    
    if (!error.response) {
      return Promise.reject(new Error('Network error. Please check your connection.'));
    }
    
    return Promise.reject(error);
  }
);

export default api;

