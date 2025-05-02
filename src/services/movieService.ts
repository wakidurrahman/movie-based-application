/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from '@/api/axiosInstance';
import { config, endpoints } from '@/config/app.config';
import {
  Movie,
  MovieApiResponse,
  MovieDetailResponse,
  MovieResponse,
  MovieSearchResponse,
} from '@/types/types';

/**
 * API caching and request management
 * Handles caching, request deduplication, and development mode data handling
 */
class ApiRequestManager {
  private cache = new Map<string, MovieResponse>();
  private pendingRequests = new Map<string, Promise<MovieResponse>>();
  private mockDataPromise: Promise<Movie[]> | null = null;
  private mockSearchCache = new Map<string, MovieResponse>();

  /**
   * Get data from cache or make a new request
   * @param url - API endpoint URL
   * @returns Promise with the API response
   */
  async get(url: string): Promise<MovieResponse> {
    // Check cache first
    if (this.cache.has(url)) {
      return this.cache.get(url)!;
    }

    // Check for pending request
    if (this.pendingRequests.has(url)) {
      return this.pendingRequests.get(url)!;
    }

    // Make a new request
    const requestPromise = axiosInstance
      .get<MovieApiResponse>(url)
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

  /**
   * Search in mock data for development mode
   * @param searchTerm - Term to search for
   * @returns Promise with search results
   */
  async searchMockData(searchTerm: string): Promise<MovieResponse> {
    // Normalize the search term for caching
    const normalizedTerm = searchTerm.trim().toLowerCase();

    // Use cached search results if available
    if (this.mockSearchCache.has(normalizedTerm)) {
      return this.mockSearchCache.get(normalizedTerm)!;
    }

    // Get all movies from mock data
    const allMovies = await this.getMockData();

    // Create an artificial delay to simulate network request
    const result = new Promise<MovieResponse>(resolve => {
      setTimeout(() => {
        let response: MovieResponse;

        // Empty search returns all movies
        if (!normalizedTerm) {
          const searchResponse: MovieSearchResponse = {
            Search: allMovies,
            totalResults: allMovies.length.toString(),
            Response: 'True',
          };

          response = {
            data: searchResponse,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: { headers: {} as any },
          };
        } else {
          // Filter movies matching the search term
          const movies = allMovies.filter(
            (movie: Movie) =>
              movie.Title.toLowerCase().includes(normalizedTerm) ||
              movie.Actors.toLowerCase().includes(normalizedTerm) ||
              movie.Director.toLowerCase().includes(normalizedTerm)
          );

          const searchResponse: MovieSearchResponse = {
            Search: movies,
            totalResults: movies.length.toString(),
            Response: movies.length > 0 ? 'True' : 'False',
            Error: movies.length === 0 ? 'Movie not found!' : undefined,
          };

          response = {
            data: searchResponse,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: { headers: {} as any },
          };
        }

        // Cache the search result
        this.mockSearchCache.set(normalizedTerm, response);
        resolve(response);
      }, 300); // Simulate network delay
    });

    return result;
  }

  /**
   * Load and cache mock data for development mode
   * @returns Promise with array of mock movies
   */
  async getMockData(): Promise<Movie[]> {
    if (this.mockDataPromise) {
      return this.mockDataPromise;
    }

    this.mockDataPromise = import('../data/sample.json').then(response => response.default);
    return this.mockDataPromise;
  }

  /**
   * Get a specific movie by ID from mock data
   * @param id - IMDB ID of the movie
   * @returns Promise with the movie details
   */
  async getMovieByIdFromMock(id: string): Promise<MovieResponse> {
    const allMovies = await this.getMockData();
    const movie = allMovies.find((movie: Movie) => movie.imdbID === id);

    if (!movie) {
      throw new Error('Movie not found');
    }

    const detailResponse: MovieDetailResponse = {
      ...movie,
      Response: 'True',
    };

    return {
      data: detailResponse,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: { headers: {} as any },
    };
  }
}

// Create a singleton instance
const apiManager = new ApiRequestManager();

/**
 * Fetch movie by title
 * @param title - Optional movie title (uses default if not provided)
 * @returns Promise with movie data
 */
export const fetchMovie = (title?: string): Promise<MovieResponse> => {
  if (config.isDevelopment) {
    return apiManager.searchMockData(title || '');
  }

  const t = title || config.api.defaultTitle;
  const url = `${endpoints.byTitle(t)}&apikey=${config.api.apiKey}`;
  return apiManager.get(url);
};

/**
 * Search movies by term
 * @param searchTerm - Term to search for
 * @returns Promise with search results
 */
export const searchMovies = (searchTerm: string): Promise<MovieResponse> => {
  if (config.isDevelopment) {
    return apiManager.searchMockData(searchTerm);
  }

  const url = `${endpoints.search(searchTerm)}&apikey=${config.api.apiKey}`;
  return apiManager.get(url);
};

/**
 * Fetch movie details by ID
 * @param id - IMDB ID of the movie
 * @returns Promise with movie details
 */
export const fetchMovieById = (id: string): Promise<MovieResponse> => {
  if (config.isDevelopment) {
    return apiManager.getMovieByIdFromMock(id);
  }

  const url = `${endpoints.byId(id)}&apikey=${config.api.apiKey}`;
  return apiManager.get(url);
};

export default {
  fetchMovie,
  searchMovies,
  fetchMovieById,
};
