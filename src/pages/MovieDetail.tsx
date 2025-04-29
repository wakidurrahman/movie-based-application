import { Alert } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/atoms/LoadingSpinner';
import MovieDetailPanel from '../components/organisms/MovieDetailPanel';
import Base from '../components/template/Base';
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

  // Loading state
  if (status === 'loading') {
    return (
      <Base>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
          }}
        >
          <LoadingSpinner />
        </div>
      </Base>
    );
  }

  // Error state
  if (status === 'failed') {
    return (
      <Base>
        <Alert
          message="Error"
          description={error || 'Failed to load movie details'}
          type="error"
          showIcon
        />
      </Base>
    );
  }

  // Not found state
  if (!movie) {
    return (
      <Base>
        <Alert
          message="Not Found"
          description="The movie you're looking for doesn't exist"
          type="warning"
          showIcon
        />
      </Base>
    );
  }

  return (
    <Base>
      <MovieDetailPanel
        movie={movie}
        isFavorite={isFavorite}
        onFavoriteToggle={handleFavoriteToggle}
      />
    </Base>
  );
};

export default MovieDetail;
