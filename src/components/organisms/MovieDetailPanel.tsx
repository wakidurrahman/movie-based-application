import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Descriptions, Divider, Image, Space, Tag, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { Movie } from '../../store/moviesSlice';
import FavoriteIcon from '../atoms/FavoriteIcon';

const { Title, Text, Paragraph } = Typography;

interface MovieDetailPanelProps {
  movie: Movie;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

const MovieDetailPanel = ({ movie, isFavorite, onFavoriteToggle }: MovieDetailPanelProps) => {
  const imageSrc =
    movie.Poster === 'N/A'
      ? 'https://via.placeholder.com/300x450?text=No+Image+Available'
      : movie.Poster;

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Link to="/movies">
          <Button type="text" icon={<ArrowLeftOutlined />}>
            Back to Movies
          </Button>
        </Link>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
          {/* Movie poster */}
          <div style={{ flex: '0 0 300px', marginBottom: 20 }}>
            <Image
              src={imageSrc}
              alt={movie.Title}
              style={{ maxWidth: '100%', borderRadius: 8 }}
              fallback="https://via.placeholder.com/300x450?text=No+Image+Available"
            />
          </div>

          {/* Movie info */}
          <div style={{ flex: '1 1 500px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 16,
              }}
            >
              <Title level={2} style={{ margin: 0 }}>
                {movie.Title}
              </Title>
              <FavoriteIcon isFavorite={isFavorite} onClick={onFavoriteToggle} size={28} />
            </div>

            <Space direction="horizontal" size={16} wrap style={{ marginBottom: 16 }}>
              <Text>{movie.Year}</Text>
              <Text>•</Text>
              <Text>{movie.Runtime}</Text>
              <Text>•</Text>
              <Text>{movie.Rated}</Text>
            </Space>

            {/* Genres */}
            <div style={{ marginBottom: 16 }}>
              {movie.Genre.split(', ').map((genre, index) => (
                <Tag key={index} color="blue" style={{ marginRight: 8, marginBottom: 8 }}>
                  {genre}
                </Tag>
              ))}
            </div>

            {/* Ratings */}
            <div style={{ marginBottom: 16 }}>
              {movie.imdbRating !== 'N/A' && (
                <Tag color="gold" style={{ marginRight: 8, marginBottom: 8 }}>
                  IMDb: {movie.imdbRating}/10
                </Tag>
              )}
              {movie.Metascore !== 'N/A' && (
                <Tag color="green" style={{ marginRight: 8, marginBottom: 8 }}>
                  Metascore: {movie.Metascore}/100
                </Tag>
              )}
            </div>

            {/* Plot */}
            <div style={{ marginBottom: 16 }}>
              <Title level={4}>Plot</Title>
              <Paragraph>{movie.Plot}</Paragraph>
            </div>
          </div>
        </div>

        <Divider />

        {/* Additional details */}
        <Descriptions
          title="Movie Details"
          bordered
          column={{ xxl: 4, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}
        >
          <Descriptions.Item label="Director">{movie.Director}</Descriptions.Item>
          <Descriptions.Item label="Writer">{movie.Writer}</Descriptions.Item>
          <Descriptions.Item label="Actors">{movie.Actors}</Descriptions.Item>
          <Descriptions.Item label="Language">{movie.Language}</Descriptions.Item>
          <Descriptions.Item label="Country">{movie.Country}</Descriptions.Item>
          <Descriptions.Item label="Awards">{movie.Awards}</Descriptions.Item>
          {movie.BoxOffice !== 'N/A' && (
            <Descriptions.Item label="Box Office">{movie.BoxOffice}</Descriptions.Item>
          )}
          {movie.DVD !== 'N/A' && (
            <Descriptions.Item label="DVD Release">{movie.DVD}</Descriptions.Item>
          )}
        </Descriptions>
      </div>
    </div>
  );
};

export default MovieDetailPanel;
