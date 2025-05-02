/**
 * Favorites Component
 *
 * This component displays a user's favorite movies, allowing them to browse,
 * search through, and manage their collection of favorite films.
 *
 * Features:
 * - Displays a list of movies that the user has marked as favorites
 * - Provides search functionality to filter favorite movies
 * - Shows appropriate empty states when no favorites exist or search yields no results
 * - Allows users to remove movies from their favorites list
 *
 * Redux Integration:
 * - Retrieves favorite movie IDs from the favorites slice
 * - Fetches movie data from the movies slice
 * - Dispatches actions to toggle favorite status
 */

import SearchBar from '@/components/atoms/search-bar';
import MovieList from '@/components/molecules/movie-list';
import Base from '@/components/template/base/';
import { selectFavoriteIds, toggleFavorite } from '@/store/favoritesSlice';
import { selectAllMovies } from '@/store/moviesSlice';
import { AppDispatch } from '@/store/store';
import { Movie } from '@/types/types';
import { useSearch } from '@/utils/search';
import { Empty, Flex, Typography } from 'antd';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const { Title } = Typography;

/**
 * Favorites component for displaying and managing user's favorite movies
 * @returns JSX.Element - The rendered component
 */
const Favorites = () => {
  const dispatch = useDispatch<AppDispatch>();
  const allMovies = useSelector(selectAllMovies);
  const favoriteIds = useSelector(selectFavoriteIds);

  // Filter movies to only show favorites
  const favoriteMovies = useMemo(() => {
    return allMovies.filter((movie: Movie) => favoriteIds.includes(movie.imdbID));
  }, [allMovies, favoriteIds]);

  // State for searched movies
  const [searchedMovies, setSearchedMovies] = React.useState(favoriteMovies);

  // Update searched movies when favorite movies change
  React.useEffect(() => {
    setSearchedMovies(favoriteMovies);
  }, [favoriteMovies]);

  // Set up search with the utility hook
  const { searchTerm, debouncedSearch } = useSearch('', term => {
    if (!term.trim()) {
      setSearchedMovies(favoriteMovies);
      return;
    }

    const filtered = favoriteMovies.filter((movie: Movie) =>
      movie.Title.toLowerCase().includes(term.toLowerCase())
    );
    setSearchedMovies(filtered);
  });

  /**
   * Handles toggling the favorite status of a movie
   * @param movieId - IMDB ID of the movie to toggle
   */
  const handleFavoriteToggle = (movieId: string) => {
    dispatch(toggleFavorite(movieId));
  };

  return (
    <Base>
      <Flex vertical align="center" justify="space-between" gap={24}>
        <Title level={2}>Your Favorite Movies</Title>

        <SearchBar onSearch={debouncedSearch} placeholder="Search in your favorites..." />

        {searchedMovies.length === 0 && favoriteMovies.length > 0 && (
          <Empty className="m-movie-list__empty" description="No results found!" />
        )}

        {favoriteMovies.length === 0 ? (
          <Empty
            description="You haven't added any favorites yet"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ) : (
          <MovieList
            movies={searchedMovies}
            favoriteIds={favoriteIds}
            onFavoriteToggle={handleFavoriteToggle}
          />
        )}
      </Flex>
    </Base>
  );
};

export default Favorites;
