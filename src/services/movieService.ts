import axios from 'axios';
import { config, endpoints } from '../app.config';
import { Movie } from '../store/moviesSlice';

// Simple cache implementation to prevent duplicate API calls
const apiCache = new Map();

// Create axios instance with interceptors
const axiosInstance = axios.create({
  baseURL: config.api.baseUrl,
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

/**
 * Wrapper for axios calls with caching
 */
const cachedGet = async (url: string) => {
  // Check if we have a cached response
  if (apiCache.has(url)) {
    console.log(`[CACHE HIT] Using cached data for: ${url}`);
    return apiCache.get(url);
  }

  // Make the actual API call if not cached
  console.log(`[API REQUEST] Fetching: ${url}`);
  const response = await axiosInstance.get(url);

  // Cache the response
  apiCache.set(url, response);
  return response;
};

/**
 * Fetch dummy data for development environment
 */
const fetchDummyData = async () => {
  const response = await import('../data/dummy.json');
  console.log('fetchDummyData', response.default);
  return response.default;
};

/**
 * Get a movie by ID from dummy data
 */
const getMovieByIdFromDummy = async (id: string) => {
  const allMovies = await fetchDummyData();
  const movie = allMovies.find((movie: Movie) => movie.imdbID === id);

  if (!movie) {
    throw new Error('Movie not found');
  }

  return {
    data: { ...movie, Response: 'True' },
  };
};

/**
 * Get movies from dummy data
 */
const getMoviesFromDummy = async (title?: string) => {
  const allMovies = await fetchDummyData();

  // If no title is provided, return all movies in Search array format
  if (!title) {
    console.log('getMoviesFromDummy', allMovies);
    return {
      data: {
        Search: allMovies,
        totalResults: allMovies.length.toString(),
        Response: 'True',
      },
    };
  }

  // Find movie with title containing the search term (case insensitive)
  const movie = allMovies.find((movie: Movie) =>
    movie.Title.toLowerCase().includes(title.toLowerCase())
  );

  if (!movie) {
    return { data: { Response: 'False', Error: 'Movie not found!' } };
  }

  // Return single movie in an array format to match Search structure
  return {
    data: {
      Search: [movie],
      totalResults: '1',
      Response: 'True',
    },
  };
};

/**
 * Search movies by term from dummy data
 */
const searchMoviesFromDummy = async (searchTerm: string) => {
  const allMovies = await fetchDummyData();

  if (!searchTerm) {
    // Return all movies if no search term
    return {
      data: {
        Search: allMovies,
        totalResults: allMovies.length.toString(),
        Response: 'True',
      },
    };
  }

  // Filter movies with title containing the search term (case insensitive)
  const movies = allMovies.filter((movie: Movie) =>
    movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (movies.length === 0) {
    return { data: { Response: 'False', Error: 'Movie not found!' } };
  }

  return {
    data: {
      Search: movies,
      totalResults: movies.length.toString(),
      Response: 'True',
    },
  };
};

// Fetch movie by title
export const fetchMovie = (title?: string) => {
  if (config.isDevelopment) {
    console.log('fetchMovie in dev mode', title);
    return getMoviesFromDummy(title);
  }

  const t = title || config.api.defaultTitle;
  console.log('fetchMovie in prod mode', t);
  // Use cached get instead of direct axios call
  const url = `${endpoints.byTitle(t)}&apikey=${config.api.apiKey}`;
  return cachedGet(url);
};

// Fetch movies by search term
export const searchMovies = (searchTerm: string) => {
  if (config.isDevelopment) {
    return searchMoviesFromDummy(searchTerm);
  }

  // Use cached get instead of direct axios call
  const url = `${endpoints.search(searchTerm)}&apikey=${config.api.apiKey}`;
  return cachedGet(url);
};

// Fetch movie by ID
export const fetchMovieById = (id: string) => {
  if (config.isDevelopment) {
    return getMovieByIdFromDummy(id);
  }

  // Use cached get instead of direct axios call
  const url = `${endpoints.byId(id)}&apikey=${config.api.apiKey}`;
  return cachedGet(url);
};

// Clear cache - useful for testing or when data needs to be refreshed
export const clearCache = () => {
  apiCache.clear();
  console.log('[CACHE] Cleared API cache');
};

export default {
  fetchMovie,
  searchMovies,
  fetchMovieById,
  clearCache,
};
