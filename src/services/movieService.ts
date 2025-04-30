import axiosInstance from '../api/axiosInstance';
import { config, endpoints } from '../config/app.config';
import { Movie } from '../store/moviesSlice';

/**
 * More robust API caching and request deduplication
 */
class ApiRequestManager {
  private cache = new Map<string, any>();
  private pendingRequests = new Map<string, Promise<any>>();
  private dummyDataPromise: Promise<Movie[]> | null = null;
  private dummySearchCache = new Map<string, any>();

  // Generate a cache key for a request
  private getCacheKey(url: string): string {
    return url;
  }

  // Get cached or in-flight data
  async get(url: string): Promise<any> {
    const cacheKey = this.getCacheKey(url);

    // Check cache first
    if (this.cache.has(cacheKey)) {
      console.log(`[CACHE HIT] Using cached data for: ${url}`);
      return this.cache.get(cacheKey);
    }

    // Check for pending request
    if (this.pendingRequests.has(cacheKey)) {
      console.log(`[PENDING] Reusing in-flight request for: ${url}`);
      return this.pendingRequests.get(cacheKey);
    }

    // Make a new request
    console.log(`[API REQUEST] Fetching: ${url}`);
    const requestPromise = axiosInstance
      .get(url)
      .then(response => {
        // Cache successful response
        this.cache.set(cacheKey, response);
        this.pendingRequests.delete(cacheKey);
        return response;
      })
      .catch(error => {
        // Clean up on error
        this.pendingRequests.delete(cacheKey);
        throw error;
      });

    // Store the pending request
    this.pendingRequests.set(cacheKey, requestPromise);
    return requestPromise;
  }

  // Search in development mode with caching
  async searchDummyData(searchTerm: string): Promise<any> {
    // Normalize the search term for caching
    const normalizedTerm = searchTerm.trim().toLowerCase();

    // Use cached search results if available
    if (this.dummySearchCache.has(normalizedTerm)) {
      console.log(`[DEV CACHE HIT] Using cached search for: "${normalizedTerm}"`);
      return this.dummySearchCache.get(normalizedTerm);
    }

    // Get all movies from dummy data
    const allMovies = await this.getDummyData();

    // Create an artificial delay to simulate network request
    const result = new Promise<any>(resolve => {
      setTimeout(() => {
        let response;

        // Empty search returns all movies
        if (!normalizedTerm) {
          response = {
            data: {
              Search: allMovies,
              totalResults: allMovies.length.toString(),
              Response: 'True',
            },
          };
        } else {
          // Filter movies matching the search term
          const movies = allMovies.filter(
            (movie: Movie) =>
              movie.Title.toLowerCase().includes(normalizedTerm) ||
              movie.Actors.toLowerCase().includes(normalizedTerm) ||
              movie.Director.toLowerCase().includes(normalizedTerm)
          );

          response = {
            data: {
              Search: movies,
              totalResults: movies.length.toString(),
              Response: movies.length > 0 ? 'True' : 'False',
              Error: movies.length === 0 ? 'Movie not found!' : undefined,
            },
          };
        }

        // Cache the search result
        this.dummySearchCache.set(normalizedTerm, response);
        resolve(response);
      }, 300); // Simulate network delay
    });

    return result;
  }

  // Get dummy data with caching
  async getDummyData(): Promise<Movie[]> {
    if (this.dummyDataPromise) {
      return this.dummyDataPromise;
    }

    this.dummyDataPromise = import('../data/dummy.json').then(response => response.default);

    return this.dummyDataPromise;
  }

  // Clear all caches
  clearCache(): void {
    this.cache.clear();
    this.pendingRequests.clear();
    this.dummyDataPromise = null;
    this.dummySearchCache.clear();
    console.log('[CACHE] Cleared all caches and pending requests');
  }
}

// Create a singleton instance
const apiManager = new ApiRequestManager();

/**
 * Get movies from dummy data
 */
const getMoviesFromDummy = async (title?: string) => {
  const allMovies = await apiManager.getDummyData();

  // If no title is provided, return all movies in Search array format
  if (!title) {
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
  const allMovies = await apiManager.getDummyData();

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

/**
 * Get a movie by ID from dummy data
 */
const getMovieByIdFromDummy = async (id: string) => {
  const allMovies = await apiManager.getDummyData();
  const movie = allMovies.find((movie: Movie) => movie.imdbID === id);

  if (!movie) {
    throw new Error('Movie not found');
  }

  return {
    data: { ...movie, Response: 'True' },
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
  const url = `${endpoints.byTitle(t)}&apikey=${config.api.apiKey}`;
  return apiManager.get(url);
};

// Fetch movies by search term
export const searchMovies = (searchTerm: string) => {
  if (config.isDevelopment) {
    console.log('searchMovies in dev mode:', searchTerm);
    return apiManager.searchDummyData(searchTerm);
  }

  console.log('searchMovies in prod mode:', searchTerm);
  const url = `${endpoints.search(searchTerm)}&apikey=${config.api.apiKey}`;
  return apiManager.get(url);
};

// Fetch movie by ID
export const fetchMovieById = (id: string) => {
  if (config.isDevelopment) {
    console.log('fetchMovieById in dev mode', id);
    return getMovieByIdFromDummy(id);
  }

  console.log('fetchMovieById in prod mode', id);
  const url = `${endpoints.byId(id)}&apikey=${config.api.apiKey}`;
  return apiManager.get(url);
};

// Clear cache - useful for testing or when data needs to be refreshed
export const clearCache = () => {
  apiManager.clearCache();
};

export default {
  fetchMovie,
  searchMovies,
  fetchMovieById,
  clearCache,
};
