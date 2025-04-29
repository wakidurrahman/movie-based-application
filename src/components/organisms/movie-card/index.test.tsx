import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import MovieCard from './index';

// Mock movie data
const mockMovie = {
  Title: 'Test Movie',
  Year: '2023',
  Rated: 'PG-13',
  Released: '01 Jan 2023',
  Runtime: '120 min',
  Genre: 'Action, Drama',
  Director: 'Test Director',
  Writer: 'Test Writer',
  Actors: 'Actor 1, Actor 2',
  Plot: 'This is a test plot.',
  Language: 'English',
  Country: 'United States',
  Awards: 'None',
  Poster: 'https://test-image.jpg',
  Ratings: [{ Source: 'Internet Movie Database', Value: '8.0/10' }],
  Metascore: '75',
  imdbRating: '8.0',
  imdbVotes: '10000',
  imdbID: 'tt1234567',
  Type: 'movie',
  DVD: 'N/A',
  BoxOffice: 'N/A',
  Production: 'N/A',
  Website: 'N/A',
  Response: 'True',
};

// Mock functions
const mockToggleFavorite = vi.fn();

describe('MovieCard Component', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(ui, { wrapper: BrowserRouter });
  };

  test('renders movie title correctly', () => {
    renderWithRouter(
      <MovieCard movie={mockMovie} isFavorite={false} onFavoriteToggle={mockToggleFavorite} />
    );

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
  });

  test('renders movie year correctly', () => {
    renderWithRouter(
      <MovieCard movie={mockMovie} isFavorite={false} onFavoriteToggle={mockToggleFavorite} />
    );

    expect(screen.getByText('2023')).toBeInTheDocument();
  });

  test('triggers favorite toggle when favorite icon is clicked', () => {
    renderWithRouter(
      <MovieCard movie={mockMovie} isFavorite={false} onFavoriteToggle={mockToggleFavorite} />
    );

    // Find the favorite icon (using the role="button" and aria-label)
    const favoriteButton = screen.getByRole('button', {
      name: /add to favorites/i,
    });

    // Click the favorite icon
    fireEvent.click(favoriteButton);

    // Verify the toggle function was called
    expect(mockToggleFavorite).toHaveBeenCalledTimes(1);
  });
});
