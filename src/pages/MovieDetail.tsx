/**
 * MovieDetail Component
 *
 * This component displays detailed information about a specific movie.
 * It fetches movie data based on the movieId parameter from the URL,
 * and renders different UI states based on the loading status.
 *
 * Features:
 * - Fetches movie details using the movieId from URL parameters
 * - Shows loading spinner while data is being fetched
 * - Displays error messages if fetching fails
 * - Shows a warning if the movie doesn't exist
 * - Renders detailed movie information when available
 * - Allows toggling favorite status for the movie
 *
 * Redux Integration:
 * - Uses movie data from the movies slice
 * - Integrates with favorites functionality
 * - Dispatches actions to fetch movie data and toggle favorites
 */

import LoadingSpinner from '@/components/atoms/loading-spinner';
import MovieDetailPanel from '@/components/organisms/movie-detail-panel';
import Base from '@/components/template/base';
import { selectIsFavorite, toggleFavorite } from '@/store/favoritesSlice';
import {
  fetchMovieById,
  selectMovieError,
  selectMovieStatus,
  selectSelectedMovie,
} from '@/store/moviesSlice';
import { AppDispatch, RootState } from '@/store/store';
import { Alert } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

/**
 * MovieDetail component for displaying detailed information about a specific movie
 * @returns JSX.Element - The rendered component
 */
const MovieDetail = () => {
  const { movieId = '' } = useParams<{ movieId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const movie = useSelector(selectSelectedMovie);
  const status = useSelector(selectMovieStatus);
  const error = useSelector(selectMovieError);
  const isFavorite = useSelector((state: RootState) => selectIsFavorite(state, movieId));

  // Fetch movie details when component mounts or movieId changes
  useEffect(() => {
    if (movieId) {
      dispatch(fetchMovieById(movieId));
    }
  }, [dispatch, movieId]);

  /**
   * Handles toggling the favorite status of the current movie
   */
  const handleFavoriteToggle = () => {
    if (movieId) {
      dispatch(toggleFavorite(movieId));
    }
  };

  /**
   * Renders appropriate content based on the current loading status
   * @returns JSX.Element - The content to display
   */
  const renderContent = () => {
    if (status === 'loading') {
      return <LoadingSpinner />;
    }

    if (status === 'failed') {
      return (
        <Alert
          message="Error"
          description={error || 'Failed to load movie details'}
          type="error"
          showIcon
        />
      );
    }

    if (!movie) {
      return (
        <Alert
          message="Not Found"
          description="The movie you're looking for doesn't exist"
          type="warning"
          showIcon
        />
      );
    }

    return (
      <MovieDetailPanel
        movie={movie}
        isFavorite={isFavorite}
        onFavoriteToggle={handleFavoriteToggle}
      />
    );
  };

  return <Base>{renderContent()}</Base>;
};

export default MovieDetail;
