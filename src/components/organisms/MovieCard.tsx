import { Card, Space, Tag, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { Movie } from '../../store/moviesSlice';
import FavoriteIcon from '../atoms/FavoriteIcon';

const { Meta } = Card;
const { Text, Paragraph } = Typography;

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

const MovieCard = ({ movie, isFavorite, onFavoriteToggle }: MovieCardProps) => {
  // Default image if poster is not available
  const imageSrc =
    movie.Poster === 'N/A' || !movie.Poster
      ? 'https://via.placeholder.com/300x450?text=No+Image+Available'
      : movie.Poster;

  // Extract genres and handle potential undefined values
  const genres = movie.Genre && typeof movie.Genre === 'string' ? movie.Genre.split(', ') : [];

  return (
    <Card
      hoverable
      cover={
        <div style={{ height: 300, overflow: 'hidden', position: 'relative' }}>
          <img
            alt={movie.Title || 'Movie poster'}
            src={imageSrc}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              zIndex: 1,
              background: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '50%',
              padding: 5,
            }}
          >
            <FavoriteIcon isFavorite={isFavorite} onClick={onFavoriteToggle} size={20} />
          </div>
        </div>
      }
    >
      <Link to={`/movies/${movie.imdbID}`} style={{ color: 'inherit' }}>
        <Meta
          title={movie.Title || 'Unknown Title'}
          description={
            <Space direction="vertical" size={2}>
              <Space>
                <Text type="secondary">{movie.Year || 'N/A'}</Text>
                <Text type="secondary">•</Text>
                <Text type="secondary">{movie.Runtime || 'N/A'}</Text>
              </Space>

              <div>
                {genres.length > 0 ? (
                  <>
                    {genres.slice(0, 2).map((genre, index) => (
                      <Tag key={index} color="blue" style={{ marginBottom: 5 }}>
                        {genre}
                      </Tag>
                    ))}
                    {genres.length > 2 && <Tag color="blue">+{genres.length - 2}</Tag>}
                  </>
                ) : (
                  <Tag color="blue">Genre N/A</Tag>
                )}
              </div>

              <div>
                {movie.imdbRating && movie.imdbRating !== 'N/A' ? (
                  <Tag color="gold">★ {movie.imdbRating}/10</Tag>
                ) : null}
              </div>
            </Space>
          }
        />
      </Link>
    </Card>
  );
};

export default MovieCard;
