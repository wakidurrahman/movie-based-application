// Environment variables
const isDevelopment = import.meta.env.MODE === 'development' || import.meta.env.DEV;

// Log environment at initialization
console.log(`⚙️ Running in ${isDevelopment ? 'DEVELOPMENT' : 'PRODUCTION'} mode`);

export const config = {
  api: {
    // Use development values for dev mode, production values for prod mode
    baseUrl: isDevelopment ? 'http://localhost:5173/' : 'https://www.omdbapi.com',
    defaultTitle: isDevelopment ? '' : 'Avatar+2',
    apiKey: isDevelopment ? '' : 'bf05324b',
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
console.log('📝 Config:', config);

export default config;
