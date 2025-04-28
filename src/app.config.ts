// Environment variables
export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  environment: import.meta.env.NODE_ENV || 'development',
  isProduction: import.meta.env.NODE_ENV === 'production',
  isDevelopment: import.meta.env.NODE_ENV === 'development',
};

// API endpoints
export const endpoints = {
  movies: '/movies',
  movie: (id: string) => `/movies/${id}`,
};

export default config;
