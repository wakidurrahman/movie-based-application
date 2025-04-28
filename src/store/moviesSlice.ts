import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
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
}

// Initial state
const initialState: MoviesState = {
  list: [],
  status: 'idle',
  error: null,
  selectedMovie: null,
};

// Thunk for fetching movies
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  try {
    // In a real app, we would fetch from an API
    // For now, fetch from our dummy.json using a relative path
    const response = await import('../data/dummy.json');
    return response.default as Movie[];
  } catch (error) {
    throw error;
  }
});

// Thunk for fetching a single movie by ID
export const fetchMovieById = createAsyncThunk(
  'movies/fetchMovieById',
  async (movieId: string, { getState }) => {
    const state = getState() as RootState;

    // First, check if we already have the movie in our state
    const existingMovie = state.movies.list.find((movie: Movie) => movie.imdbID === movieId);
    if (existingMovie) {
      return existingMovie;
    }

    // If not found in state, fetch from dummy data
    // In a real app, we would make an API call with the ID
    const response = await import('../data/dummy.json');
    const allMovies = response.default as Movie[];
    const movie = allMovies.find((movie: Movie) => movie.imdbID === movieId);

    if (!movie) {
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
        state.list = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
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
export const selectMovieStatus = (state: RootState) => state.movies.status;
export const selectMovieError = (state: RootState) => state.movies.error;
export const selectSelectedMovie = (state: RootState) => state.movies.selectedMovie;
export const selectMovieById = (state: RootState, movieId: string) =>
  state.movies.list.find((movie: Movie) => movie.imdbID === movieId);

export default moviesSlice.reducer;
