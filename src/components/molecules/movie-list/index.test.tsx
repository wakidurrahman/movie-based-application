import { Movie } from '@/types/types';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import MovieList from './index';

// Mock the MovieCard component
vi.mock('@/components/organisms/movie-card', () => ({
  default: ({
    movie,
    isFavorite,
    onFavoriteToggle,
  }: {
    movie: Movie;
    isFavorite: boolean;
    onFavoriteToggle: () => void;
  }) => (
    <div
      data-testid={`movie-card-${movie.imdbID}`}
      data-title={movie.Title}
      data-is-favorite={isFavorite}
      onClick={onFavoriteToggle}
    >
      {movie.Title}
    </div>
  ),
}));

describe('MovieList Component', () => {
  // Create mock movies that satisfy the Movie interface
  const mockMovies: Movie[] = [
    {
      imdbID: 'tt0111161',
      Title: 'The Shawshank Redemption',
      Year: '1994',
      Poster: 'poster-url',
      imdbRating: '9.3',
      Rated: 'R',
      Runtime: '142 min',
      Genre: 'Drama',
      Director: 'Frank Darabont',
      Writer: 'Stephen King, Frank Darabont',
      Actors: 'Tim Robbins, Morgan Freeman',
      Plot: 'Two imprisoned men bond over a number of years...',
      Language: 'English',
      Country: 'USA',
      Awards: '7 Oscar nominations',
      Ratings: [{ Source: 'Internet Movie Database', Value: '9.3/10' }],
      Metascore: '80',
      imdbVotes: '2,400,000',
      Type: 'movie',
      DVD: '21 Dec 1999',
      BoxOffice: '$28,341,469',
      Production: 'Columbia Pictures',
      Website: 'N/A',
      Response: 'True',
      Released: '14 Oct 1994',
    },
    {
      imdbID: 'tt0068646',
      Title: 'The Godfather',
      Year: '1972',
      Poster: 'poster-url',
      imdbRating: '9.2',
      Rated: 'R',
      Runtime: '175 min',
      Genre: 'Crime, Drama',
      Director: 'Francis Ford Coppola',
      Writer: 'Mario Puzo, Francis Ford Coppola',
      Actors: 'Marlon Brando, Al Pacino',
      Plot: 'The aging patriarch of an organized crime dynasty...',
      Language: 'English, Italian, Latin',
      Country: 'USA',
      Awards: 'Won 3 Oscars',
      Ratings: [{ Source: 'Internet Movie Database', Value: '9.2/10' }],
      Metascore: '100',
      imdbVotes: '1,700,000',
      Type: 'movie',
      DVD: '11 May 2004',
      BoxOffice: '$134,966,411',
      Production: 'Paramount Pictures',
      Website: 'N/A',
      Response: 'True',
      Released: '24 Mar 1972',
    },
  ];

  const mockFavoriteIds = ['tt0068646']; // The Godfather is a favorite
  const mockOnFavoriteToggle = vi.fn();

  test('renders all movies in the list', () => {
    render(
      <MovieList
        movies={mockMovies}
        favoriteIds={mockFavoriteIds}
        onFavoriteToggle={mockOnFavoriteToggle}
      />
    );

    // Check if all movies are rendered
    mockMovies.forEach(movie => {
      const movieCard = screen.getByTestId(`movie-card-${movie.imdbID}`);
      expect(movieCard).toBeInTheDocument();
      expect(movieCard).toHaveTextContent(movie.Title);
    });
  });

  test('correctly identifies favorite movies', () => {
    render(
      <MovieList
        movies={mockMovies}
        favoriteIds={mockFavoriteIds}
        onFavoriteToggle={mockOnFavoriteToggle}
      />
    );

    // Check if the favorite status is correctly set
    const godfather = screen.getByTestId('movie-card-tt0068646');
    const shawshank = screen.getByTestId('movie-card-tt0111161');

    expect(godfather).toHaveAttribute('data-is-favorite', 'true');
    expect(shawshank).toHaveAttribute('data-is-favorite', 'false');
  });

  test('calls onFavoriteToggle with correct movieId', () => {
    render(
      <MovieList
        movies={mockMovies}
        favoriteIds={mockFavoriteIds}
        onFavoriteToggle={mockOnFavoriteToggle}
      />
    );

    // Click on a movie card
    const shawshank = screen.getByTestId('movie-card-tt0111161');
    shawshank.click();

    // Check if onFavoriteToggle was called with the correct ID
    expect(mockOnFavoriteToggle).toHaveBeenCalledWith('tt0111161');
  });

  test('renders empty list when no movies provided', () => {
    const { container } = render(
      <MovieList
        movies={[]}
        favoriteIds={mockFavoriteIds}
        onFavoriteToggle={mockOnFavoriteToggle}
      />
    );

    // Get the Row but it should be empty
    const row = container.querySelector('.ant-row');
    expect(row).toBeInTheDocument();
    expect(row?.children.length).toBe(0);
  });

  test('uses different column sizes based on number of movies', () => {
    // Render with less than 3 movies (should use wider columns)
    const { container, rerender } = render(
      <MovieList
        movies={mockMovies.slice(0, 2)}
        favoriteIds={mockFavoriteIds}
        onFavoriteToggle={mockOnFavoriteToggle}
      />
    );

    // With 2 movies, we should have Col with md={12}
    let cols = container.querySelectorAll('.ant-col');
    cols.forEach(col => {
      expect(col).toHaveClass('ant-col-md-12');
    });

    // Make a larger list of movies
    const moreMovies: Movie[] = [
      ...mockMovies,
      {
        imdbID: 'tt0071562',
        Title: 'The Godfather: Part II',
        Year: '1974',
        Poster: 'poster-url',
        imdbRating: '9.0',
        Rated: 'R',
        Runtime: '202 min',
        Genre: 'Crime, Drama',
        Director: 'Francis Ford Coppola',
        Writer: 'Francis Ford Coppola, Mario Puzo',
        Actors: 'Al Pacino, Robert De Niro',
        Plot: 'The early life and career of Vito Corleone...',
        Language: 'English, Italian, Sicilian',
        Country: 'USA',
        Awards: 'Won 6 Oscars',
        Ratings: [{ Source: 'Internet Movie Database', Value: '9.0/10' }],
        Metascore: '90',
        imdbVotes: '1,100,000',
        Type: 'movie',
        DVD: '10 Oct 2001',
        BoxOffice: '$57,300,000',
        Production: 'Paramount Pictures',
        Website: 'N/A',
        Response: 'True',
        Released: '20 Dec 1974',
      },
    ];

    // Rerender with more movies
    rerender(
      <MovieList
        movies={moreMovies}
        favoriteIds={mockFavoriteIds}
        onFavoriteToggle={mockOnFavoriteToggle}
      />
    );

    // With 3+ movies, we should have Col with md={6}
    cols = container.querySelectorAll('.ant-col');
    cols.forEach(col => {
      expect(col).toHaveClass('ant-col-md-6');
    });
  });
});
