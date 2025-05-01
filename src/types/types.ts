import { AxiosResponse } from 'axios';

/**
 * Core Movie interface used throughout the application
 */
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

/**
 * API response types
 */
export interface MovieSearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
  Movies?: Movie[]; // For backward compatibility
}

export interface MovieDetailResponse extends Movie {
  Response: string;
  Error?: string;
}

export type MovieApiResponse = MovieSearchResponse | MovieDetailResponse;

export type MovieResponse = AxiosResponse<MovieApiResponse>;

/**
 * Redux state types
 */
export interface MoviesState {
  list: Movie[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedMovie: Movie | null;
  searchResults: Movie[];
}
