/**
 * Home Component
 *
 * This component serves as the main landing page of the application, displaying
 * a list of movies that users can browse and search through.
 *
 * Features:
 * - Displays a list of movies fetched from the API
 * - Provides search functionality to filter movies
 * - Shows loading states during data fetching
 * - Handles empty states and search with no results
 * - Allows users to toggle favorite status for movies
 *
 * Redux Integration:
 * - Fetches and displays movies from the movies slice
 * - Integrates with favorites functionality
 * - Dispatches actions to fetch movies, search, and toggle favorites
 */

import LoadingSpinner from '@/components/atoms/loading-spinner';
import SearchBar from '@/components/atoms/search-bar';
import MovieList from '@/components/molecules/movie-list';
import Base from '@/components/template/base/';
import { selectFavoriteIds, toggleFavorite } from '@/store/favoritesSlice';
import {
  fetchMovies,
  searchMoviesByTerm,
  selectAllMovies,
  selectMovieStatus,
  selectSearchResults,
} from '@/store/moviesSlice';
import { AppDispatch } from '@/store/store';
import { useSearch } from '@/utils/search';
import { Empty, Flex, Typography } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const { Title } = Typography;

/**
 * Home component for displaying the main movie browsing interface
 * @returns JSX.Element - The rendered component
 */
const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector(selectAllMovies);
  const searchResults = useSelector(selectSearchResults);
  const favoriteIds = useSelector(selectFavoriteIds);
  const status = useSelector(selectMovieStatus);

  // Set up search with the utility hook
  const { searchTerm, isSearchActive, debouncedSearch } = useSearch('', term =>
    dispatch(searchMoviesByTerm(term))
  );

  // Initial data loading
  useEffect(() => {
    if (status !== 'loading' && movies.length === 0) {
      dispatch(fetchMovies());
    }
  }, [dispatch, status, movies.length]);

  /**
   * Handles toggling the favorite status of a movie
   * @param movieId - IMDB ID of the movie to toggle
   */
  const handleFavoriteToggle = (movieId: string) => {
    dispatch(toggleFavorite(movieId));
  };

  // Check if any loading operation is in progress
  const isLoading = status === 'loading';

  // Determine which movies to display
  const moviesToDisplay = isSearchActive ? searchResults : movies;
  const showNoResults = isSearchActive && !isLoading && searchResults.length === 0;
  const showMovieList = !isLoading && moviesToDisplay.length > 0;
  const showEmptyState = !isSearchActive && !isLoading && movies.length === 0 && status !== 'idle';

  return (
    <Base>
      <Flex vertical align="center" justify="space-between" gap={24}>
        <Title level={2}>Explore Movies</Title>
        <SearchBar placeholder="Search for movies..." onSearch={debouncedSearch} />

        {isLoading && <LoadingSpinner />}

        {showNoResults && <Empty className="m-movie-list__empty" description="No results found!" />}

        {showEmptyState && <Empty className="m-movie-list__empty" description="No movies found" />}

        {showMovieList && (
          <MovieList
            movies={moviesToDisplay}
            favoriteIds={favoriteIds}
            onFavoriteToggle={handleFavoriteToggle}
          />
        )}
      </Flex>
    </Base>
  );
};

export default Home;
