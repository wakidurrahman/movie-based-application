import axiosInstance from '../api/axiosInstance';
import { config, endpoints } from '../config/app.config';
import { Movie } from '../store/moviesSlice';

/**
 * API caching and request management
 */
class ApiRequestManager {
  private cache = new Map<string, any>();
  private pendingRequests = new Map<string, Promise<any>>();
  private dummyDataPromise: Promise<Movie[]> | null = null;
  private dummySearchCache = new Map<string, any>();

  // Get cached or in-flight data
  async get(url: string): Promise<any> {
    // Check cache first
    if (this.cache.has(url)) {
      return this.cache.get(url);
    }

    // Check for pending request
    if (this.pendingRequests.has(url)) {
      return this.pendingRequests.get(url);
    }

    // Make a new request
    const requestPromise = axiosInstance
      .get(url)
      .then(response => {
        // Cache successful response
        this.cache.set(url, response);
        this.pendingRequests.delete(url);
        return response;
      })
      .catch(error => {
        // Clean up on error
        this.pendingRequests.delete(url);
        throw error;
      });

    // Store the pending request
    this.pendingRequests.set(url, requestPromise);
    return requestPromise;
  }

  // Search in development mode with caching
  async searchDummyData(searchTerm: string): Promise<any> {
    // Normalize the search term for caching
    const normalizedTerm = searchTerm.trim().toLowerCase();

    // Use cached search results if available
    if (this.dummySearchCache.has(normalizedTerm)) {
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

  // Get a movie by ID from dummy data
  async getMovieByIdFromDummy(id: string): Promise<any> {
    const allMovies = await this.getDummyData();
    const movie = allMovies.find((movie: Movie) => movie.imdbID === id);

    if (!movie) {
      throw new Error('Movie not found');
    }

    return {
      data: { ...movie, Response: 'True' },
    };
  }

  // Clear all caches
  clearCache(): void {
    this.cache.clear();
    this.pendingRequests.clear();
    this.dummyDataPromise = null;
    this.dummySearchCache.clear();
  }
}

// Create a singleton instance
const apiManager = new ApiRequestManager();

// Fetch movie by title
export const fetchMovie = (title?: string) => {
  if (config.isDevelopment) {
    return apiManager.searchDummyData(title || '');
  }

  const t = title || config.api.defaultTitle;
  const url = `${endpoints.byTitle(t)}&apikey=${config.api.apiKey}`;
  return apiManager.get(url);
};

// Fetch movies by search term
export const searchMovies = (searchTerm: string) => {
  if (config.isDevelopment) {
    return apiManager.searchDummyData(searchTerm);
  }

  const url = `${endpoints.search(searchTerm)}&apikey=${config.api.apiKey}`;
  return apiManager.get(url);
};

// Fetch movie by ID
export const fetchMovieById = (id: string) => {
  if (config.isDevelopment) {
    return apiManager.getMovieByIdFromDummy(id);
  }

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
