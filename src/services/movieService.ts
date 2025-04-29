import axios from 'axios';
import { config } from '../app.config';

// Create axios instance with interceptors
const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptors
axiosInstance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add response interceptors
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

// Fetch movie by title
export const fetchMovie = (title?: string) => {
  const t = title ? encodeURIComponent(title) : config.api.defaultTitle;
  return axiosInstance.get(`${config.api.baseUrl}/?t=${t}&apikey=${config.api.apiKey}`);
};

// Fetch movies by search term
export const searchMovies = (searchTerm: string) => {
  return axiosInstance.get(
    `${config.api.baseUrl}/?s=${encodeURIComponent(searchTerm)}&apikey=${config.api.apiKey}`
  );
};

// Fetch movie by ID
export const fetchMovieById = (id: string) => {
  return axiosInstance.get(`${config.api.baseUrl}/?i=${id}&apikey=${config.api.apiKey}`);
};

export default {
  fetchMovie,
  searchMovies,
  fetchMovieById,
};
