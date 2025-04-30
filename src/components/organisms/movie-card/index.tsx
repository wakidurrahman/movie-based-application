import { ClockCircleOutlined } from '@ant-design/icons';
import { Card, Space, Tag, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { Movie } from '../../../store/moviesSlice';
import FavoriteIcon from '../../atoms/favorite-icon';
import './index.scss';

const { Meta } = Card;
const { Text } = Typography;

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

const MovieCard = ({ movie, isFavorite, onFavoriteToggle }: MovieCardProps) => {
  // Default image if poster is not available
  const imageSrc =
    movie.Poster === 'N/A' || !movie.Poster ? 'https://placehold.jp/300x450.png' : movie.Poster;

  // Extract genres and handle potential undefined values
  const genres = movie.Genre && typeof movie.Genre === 'string' ? movie.Genre.split(', ') : [];

  return (
    <Card
      className="o-movie-card"
      hoverable
      cover={
        <div className="o-movie-card__image-container">
          <img className="o-movie-card__image" alt={movie.Title || 'Movie poster'} src={imageSrc} />
          <div className="o-movie-card__favorite-button">
            <FavoriteIcon isFavorite={isFavorite} onClick={onFavoriteToggle} size={20} />
          </div>
        </div>
      }
    >
      <Link to={`/movies/${movie.imdbID}`}>
        <Meta
          title={movie.Title}
          description={
            <Space className="o-movie-card__info" direction="vertical" size={2}>
              <div className="o-movie-card__info-row">
                <Text type="secondary">
                  <ClockCircleOutlined /> {movie.Year || 'N/A'}
                </Text>
                <Text type="secondary" className="o-movie-card__info-separator">
                  •
                </Text>
                <Text type="secondary">{movie.Runtime || 'N/A'}</Text>
              </div>

              <div className="o-movie-card__info-tags">
                {genres.length > 0 ? (
                  <>
                    {genres.map((genre, index) => (
                      <Tag key={index} color="blue" style={{ marginBottom: 5 }}>
                        {genre}
                      </Tag>
                    ))}
                  </>
                ) : (
                  <Tag color="blue">Genre N/A</Tag>
                )}
              </div>

              {movie.imdbRating && movie.imdbRating !== 'N/A' ? (
                <Tag color="gold">★ {movie.imdbRating}/10</Tag>
              ) : null}
            </Space>
          }
        />
      </Link>
    </Card>
  );
};

export default MovieCard;
