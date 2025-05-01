import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchMovie,
  fetchMovieById as fetchMovieByIdService,
  searchMovies,
} from '../services/movieService';
import { Movie, MovieApiResponse, MovieDetailResponse, MoviesState } from '../types/types';
import type { RootState } from './store';

// Initial state
const initialState: MoviesState = {
  list: [],
  status: 'idle',
  error: null,
  selectedMovie: null,
  searchResults: [],
};

// Helper function to extract Movies from API response
const extractMoviesFromResponse = (data: MovieApiResponse): Movie[] => {
  // It's a search response with Search array
  if ('Search' in data && Array.isArray(data.Search)) {
    return data.Search;
  }

  // For backward compatibility with previous dev mode
  if ('Movies' in data && Array.isArray(data.Movies)) {
    return data.Movies;
  }

  // It's a detail response (single movie)
  if ('Title' in data && data.Response === 'True') {
    return [data];
  }

  return [];
};

// Thunk for fetching a default movie
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (_, { getState }) => {
  const state = getState() as RootState;

  // If we already have movies and are not in a failed state, use what we have
  if (state.movies.list.length > 0 && state.movies.status !== 'failed') {
    return state.movies.list;
  }

  try {
    const response = await fetchMovie();
    return extractMoviesFromResponse(response.data);
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
});

// Thunk for searching movies
export const searchMoviesByTerm = createAsyncThunk(
  'movies/searchMoviesByTerm',
  async (searchTerm: string) => {
    // Skip empty searches
    if (!searchTerm.trim()) {
      return [] as Movie[];
    }

    const response = await searchMovies(searchTerm);
    return extractMoviesFromResponse(response.data);
  }
);

// Thunk for fetching a single movie by ID
export const fetchMovieById = createAsyncThunk(
  'movies/fetchMovieById',
  async (movieId: string, { getState }) => {
    const state = getState() as RootState;

    // First, check if we already have the movie in our state
    const existingMovie = state.movies.list.find(movie => movie.imdbID === movieId);
    if (existingMovie) {
      return existingMovie;
    }

    // If not found in state, fetch from API service
    const response = await fetchMovieByIdService(movieId);
    const data = response.data;

    // Ensure we're dealing with a movie detail response
    if (!('Title' in data) || data.Response !== 'True') {
      throw new Error('Movie not found');
    }

    // Return the movie detail
    return data as MovieDetailResponse;
  }
);

// Create the slice
const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.list = action.payload;
    },
    addMovie: (state, action: PayloadAction<Movie>) => {
      state.list.push(action.payload);
    },
    removeMovie: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(movie => movie.imdbID !== action.payload);
    },
    setSelectedMovie: (state, action: PayloadAction<Movie | null>) => {
      state.selectedMovie = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // Handle fetchMovies
      .addCase(fetchMovies.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';

        // Add any new movies to the list
        action.payload.forEach(movie => {
          if (!state.list.some(m => m.imdbID === movie.imdbID)) {
            state.list.push(movie);
          }
        });
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      })
      // Handle searchMoviesByTerm
      .addCase(searchMoviesByTerm.pending, state => {
        state.status = 'loading';
      })
      .addCase(searchMoviesByTerm.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.searchResults = action.payload;

        // Add search results to the main list if they don't already exist
        action.payload.forEach(movie => {
          if (!state.list.some(m => m.imdbID === movie.imdbID)) {
            state.list.push(movie);
          }
        });
      })
      .addCase(searchMoviesByTerm.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong with search';
      })
      // Handle fetchMovieById
      .addCase(fetchMovieById.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedMovie = action.payload;
        // Add to list if not already there
        if (!state.list.some(movie => movie.imdbID === action.payload.imdbID)) {
          state.list.push(action.payload);
        }
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Could not fetch movie';
      });
  },
});

// Export actions and reducer
export const { setMovies, addMovie, removeMovie, setSelectedMovie } = moviesSlice.actions;

// Selectors
export const selectAllMovies = (state: RootState) => state.movies.list;
export const selectSearchResults = (state: RootState) => state.movies.searchResults;
export const selectMovieStatus = (state: RootState) => state.movies.status;
export const selectMovieError = (state: RootState) => state.movies.error;
export const selectSelectedMovie = (state: RootState) => state.movies.selectedMovie;
export const selectMovieById = (state: RootState, movieId: string) =>
  state.movies.list.find(movie => movie.imdbID === movieId);

export default moviesSlice.reducer;
