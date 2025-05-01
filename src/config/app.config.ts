// Environment variables
const isDevelopment = import.meta.env.MODE === 'development' || import.meta.env.DEV;

export const config = {
  api: {
    // Use development values for dev mode, production values for prod mode
    baseUrl: isDevelopment ? 'http://localhost:5173/' : 'https://www.omdbapi.com', // TODO: this only for demo purposes: better to define in env variables
    defaultTitle: isDevelopment ? '' : 'Avatar+2', // TODO: this only for demo purposes: better to define in env variables
    apiKey: isDevelopment ? '' : 'bf05324b', // TODO: this only for demo purposes: better to define in env variables
  },
  environment: import.meta.env.MODE || 'development',
  isProduction: import.meta.env.MODE === 'production',
  isDevelopment,
};

// API endpoints
export const endpoints = {
  movies: '/movies',
  movie: (id: string) => `/movies/${id}`,
  search: (query: string) => `/?s=${encodeURIComponent(query.replace(/\s+/g, '+'))}`,
  byId: (id: string) => `/?i=${id}`,
  byTitle: (title: string) => `/?t=${encodeURIComponent(title.replace(/\s+/g, '+'))}`,
};

export default config;
