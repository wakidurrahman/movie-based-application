// Environment variables
export const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
    defaultTitle: import.meta.env.VITE_DEFAULT_TITLE || 'Avatar+2',
    apiKey: import.meta.env.VITE_API_KEY || 'dev-test-key',
  },
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
