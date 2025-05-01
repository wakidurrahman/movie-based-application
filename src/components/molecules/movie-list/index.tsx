import MovieCard from '@/components/organisms/movie-card';
import { Movie } from '@/store/moviesSlice';
import { Col, Row } from 'antd';
import './index.scss';

interface MovieListProps {
  movies: Movie[];
  onFavoriteToggle: (movieId: string) => void;
  favoriteIds: string[];
}

const MovieList = ({ movies, onFavoriteToggle, favoriteIds }: MovieListProps) => {
  return (
    <div className="m-movie-list">
      <Row gutter={[16, 16]}>
        {movies.map(movie => (
          <Col
            key={movie.imdbID}
            xs={24}
            sm={12}
            md={movies.length <= 2 ? 12 : 6}
            lg={movies.length <= 2 ? 12 : 6}
            xl={movies.length <= 2 ? 12 : 6}
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
