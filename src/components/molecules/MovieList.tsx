import { Col, Empty, Row } from 'antd';
import React from 'react';
import { Movie } from '../../store/moviesSlice';
import MovieCard from '../organisms/MovieCard';

interface MovieListProps {
  movies: Movie[];
  onFavoriteToggle: (movieId: string) => void;
  favoriteIds: string[];
}

const MovieList: React.FC<MovieListProps> = ({ movies, onFavoriteToggle, favoriteIds }) => {
  if (!movies.length) {
    return <Empty description="No movies found" />;
  }

  return (
    <Row gutter={[16, 16]}>
      {movies.map(movie => (
        <Col key={movie.imdbID} xs={24} sm={12} md={8} lg={6} xl={6}>
          <MovieCard
            movie={movie}
            isFavorite={favoriteIds.includes(movie.imdbID)}
            onFavoriteToggle={() => onFavoriteToggle(movie.imdbID)}
          />
        </Col>
      ))}
    </Row>
  );
};

export default MovieList;
