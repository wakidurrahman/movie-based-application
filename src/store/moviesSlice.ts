import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchMovie,
  fetchMovieById as fetchMovieByIdService,
  searchMovies,
} from '../services/movieService';
import type { RootState } from './store';

// Define a movie interface based on our data schema
export interface Movie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

// Define the state type
interface MoviesState {
  list: Movie[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedMovie: Movie | null;
  searchResults: Movie[];
}

// Initial state
const initialState: MoviesState = {
  list: [],
  status: 'idle',
  error: null,
  selectedMovie: null,
  searchResults: [],
};

// Thunk for fetching a default movie
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (_, { getState }) => {
  try {
    const state = getState() as RootState;

    // If we already have movies and are not in a failed state, use what we have
    if (state.movies.list.length > 0 && state.movies.status !== 'failed') {
      console.log('Using existing movies from state instead of fetching again');
      return state.movies.list;
    }

    const response = await fetchMovie();
    const data = response.data;

    console.log('Fetch movies response:', data);

    // Check if we got a Search array (either dev or prod mode)
    if (data.Search && Array.isArray(data.Search)) {
      console.log('Got movies from Search array:', data.Search.length);
      return data.Search;
    }

    // Check for Movies array (backward compatibility with previous dev mode)
    if (data.Movies && Array.isArray(data.Movies)) {
      console.log('Got movies from Movies array:', data.Movies.length);
      return data.Movies;
    }

    // Otherwise check if we got a single movie
    if (data.Response === 'True' && data.Title) {
      console.log('Got a single movie:', data.Title);
      return [data];
    }

    console.log('No movies found in response');
    return [];
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
});

// Thunk for searching movies
export const searchMoviesByTerm = createAsyncThunk(
  'movies/searchMoviesByTerm',
  async (searchTerm: string) => {
    try {
      // Skip empty searches
      if (!searchTerm.trim()) {
        return [];
      }

      const response = await searchMovies(searchTerm);
      const data = response.data;

      if (data.Response === 'True') {
        return data.Search || [];
      }

      return [];
    } catch (error) {
      throw error;
    }
  }
);

// Thunk for fetching a single movie by ID
export const fetchMovieById = createAsyncThunk(
  'movies/fetchMovieById',
  async (movieId: string, { getState }) => {
    const state = getState() as RootState;

    // First, check if we already have the movie in our state
    const existingMovie = state.movies.list.find((movie: Movie) => movie.imdbID === movieId);
    if (existingMovie) {
      console.log('Using cached movie from state:', movieId);
      return existingMovie;
    }

    // If not found in state, fetch from API service
    const response = await fetchMovieByIdService(movieId);
    const movie = response.data;

    if (movie.Response !== 'True') {
      throw new Error('Movie not found');
    }

    return movie;
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
      state.list = state.list.filter((movie: Movie) => movie.imdbID !== action.payload);
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
        action.payload.forEach((movie: Movie) => {
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
        action.payload.forEach((movie: Movie) => {
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
        if (!state.list.some((movie: Movie) => movie.imdbID === action.payload.imdbID)) {
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
  state.movies.list.find((movie: Movie) => movie.imdbID === movieId);

export default moviesSlice.reducer;
