import { Alert } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/atoms/loading-spinner';
import MovieDetailPanel from '../components/organisms/movie-detail-panel';
import Base from '../components/template/base/';
import { selectIsFavorite, toggleFavorite } from '../store/favoritesSlice';
import {
  fetchMovieById,
  selectMovieError,
  selectMovieStatus,
  selectSelectedMovie,
} from '../store/moviesSlice';
import { AppDispatch, RootState } from '../store/store';

const MovieDetail = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const movie = useSelector(selectSelectedMovie);
  const status = useSelector(selectMovieStatus);
  const error = useSelector(selectMovieError);
  const isFavorite = useSelector((state: RootState) =>
    movieId ? selectIsFavorite(state, movieId) : false
  );

  useEffect(() => {
    if (movieId) {
      dispatch(fetchMovieById(movieId));
    }
  }, [dispatch, movieId]);

  const handleFavoriteToggle = () => {
    if (movieId) {
      dispatch(toggleFavorite(movieId));
    }
  };

  return (
    <Base>
      {status === 'loading' ? (
        <LoadingSpinner />
      ) : status === 'failed' ? (
        <Alert
          message="Error"
          description={error || 'Failed to load movie details'}
          type="error"
          showIcon
        />
      ) : !movie ? (
        <Alert
          message="Not Found"
          description="The movie you're looking for doesn't exist"
          type="warning"
          showIcon
        />
      ) : (
        <MovieDetailPanel
          movie={movie}
          isFavorite={isFavorite}
          onFavoriteToggle={handleFavoriteToggle}
        />
      )}
    </Base>
  );
};

export default MovieDetail;
