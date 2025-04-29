import { Col, Empty, Row } from 'antd';
import { Movie } from '../../../store/moviesSlice';
import MovieCard from '../../organisms/movie-card';
import './index.scss';

interface MovieListProps {
  movies: Movie[];
  onFavoriteToggle: (movieId: string) => void;
  favoriteIds: string[];
}

const MovieList = ({ movies, onFavoriteToggle, favoriteIds }: MovieListProps) => {
  if (!movies.length) {
    return <Empty className="m-movie-list__empty" description="No movies found" />;
  }

  return (
    <div className="m-movie-list">
      <Row gutter={[16, 16]} className="m-movie-list__row">
        {movies.map(movie => (
          <Col
            key={movie.imdbID}
            xs={24}
            sm={12}
            md={8}
            lg={6}
            xl={6}
            className="m-movie-list__col"
          >
            <MovieCard
              movie={movie}
              isFavorite={favoriteIds.includes(movie.imdbID)}
              onFavoriteToggle={() => onFavoriteToggle(movie.imdbID)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MovieList;
