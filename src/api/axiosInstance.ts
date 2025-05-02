import { config } from '@/config/app.config';
import { getToken } from '@/utils/storage';
import { message } from 'antd';
import axios from 'axios';

/**
 * Creates an Axios instance with predefined configuration.
 * The instance includes interceptors for handling request and response.
 */
const axiosInstance = axios.create({
  baseURL: config.api.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor to add authorization token to headers.
 * If a token is available, it is added to the Authorization header.
 */
axiosInstance.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    // Handles request errors
    return Promise.reject(error);
  }
);

/**
 * Response interceptor to handle errors globally.
 * Displays an error message using Ant Design's message component.
 */
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const errorMessage = error.response?.data?.message || 'Something went wrong';
    message.error(errorMessage);
    return Promise.reject(error);
  }
);

export default axiosInstance;
