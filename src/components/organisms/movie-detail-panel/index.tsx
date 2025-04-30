import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Descriptions, Divider, Flex, Image, Space, Tag, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { Movie } from '../../../store/moviesSlice';
import FavoriteIcon from '../../atoms/favorite-icon';
import './index.scss';

const { Title, Text, Paragraph } = Typography;

interface MovieDetailPanelProps {
  movie: Movie;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

const MovieDetailPanel = ({ movie, isFavorite, onFavoriteToggle }: MovieDetailPanelProps) => {
  const imageSrc =
    !movie.Poster || movie.Poster === 'N/A'
      ? 'https://via.placeholder.com/300x450?text=No+Image+Available'
      : movie.Poster;

  return (
    <div className="o-movie-detail-panel">
      <Flex vertical>
        <div className="o-movie-detail-panel__back-button">
          <Link to="/movies">
            <Button type="text" icon={<ArrowLeftOutlined />}>
              Back to Movies
            </Button>
          </Link>
        </div>

        <Flex vertical gap={32}>
          <div className="o-movie-detail-panel__header">
            {/* Movie poster */}
            <div className="o-movie-detail-panel__poster">
              <Image
                className="o-movie-detail-panel__poster-image"
                src={imageSrc}
                alt={movie.Title || 'Movie poster'}
                fallback="https://via.placeholder.com/300x450?text=No+Image+Available"
              />
            </div>

            {/* Movie info */}
            <div className="o-movie-detail-panel__info">
              <div className="o-movie-detail-panel__info-header">
                <Title level={2} className="o-movie-detail-panel__info-title">
                  {movie.Title || 'Unknown Title'}
                </Title>
                <FavoriteIcon isFavorite={isFavorite} onClick={onFavoriteToggle} size={28} />
              </div>

              <Space
                direction="horizontal"
                size={16}
                wrap
                className="o-movie-detail-panel__info-meta"
              >
                <Text>{movie.Year || 'N/A'}</Text>
                <Text>•</Text>
                <Text>{movie.Runtime || 'N/A'}</Text>
                <Text>•</Text>
                <Text>{movie.Rated || 'N/A'}</Text>
              </Space>

              {/* Genres */}
              <div className="o-movie-detail-panel__info-genres">
                {movie.Genre && typeof movie.Genre === 'string' ? (
                  movie.Genre.split(', ').map((genre, index) => (
                    <Tag key={index} color="blue" style={{ marginRight: 8, marginBottom: 8 }}>
                      {genre}
                    </Tag>
                  ))
                ) : (
                  <Tag color="blue">Genre N/A</Tag>
                )}
              </div>

              {/* Ratings */}
              <div className="o-movie-detail-panel__info-ratings">
                {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                  <Tag color="gold" style={{ marginRight: 8, marginBottom: 8 }}>
                    IMDb: {movie.imdbRating}/10
                  </Tag>
                )}
                {movie.Metascore && movie.Metascore !== 'N/A' && (
                  <Tag color="green" style={{ marginRight: 8, marginBottom: 8 }}>
                    Metascore: {movie.Metascore}/100
                  </Tag>
                )}
              </div>

              {/* Plot */}
              <div className="o-movie-detail-panel__info-plot">
                <Title level={4}>Plot</Title>
                <Paragraph>{movie.Plot || 'No plot description available.'}</Paragraph>
              </div>
            </div>
          </div>

          <Divider />

          {/* Additional details */}
          <Descriptions
            className="o-movie-detail-panel__details"
            title="Movie Details"
            bordered
            column={{ xxl: 4, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}
          >
            <Descriptions.Item label="Director">{movie.Director || 'N/A'}</Descriptions.Item>
            <Descriptions.Item label="Writer">{movie.Writer || 'N/A'}</Descriptions.Item>
            <Descriptions.Item label="Actors">{movie.Actors || 'N/A'}</Descriptions.Item>
            <Descriptions.Item label="Language">{movie.Language || 'N/A'}</Descriptions.Item>
            <Descriptions.Item label="Country">{movie.Country || 'N/A'}</Descriptions.Item>
            <Descriptions.Item label="Awards">{movie.Awards || 'N/A'}</Descriptions.Item>
            {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
              <Descriptions.Item label="Box Office">{movie.BoxOffice}</Descriptions.Item>
            )}
            {movie.DVD && movie.DVD !== 'N/A' && (
              <Descriptions.Item label="DVD Release">{movie.DVD}</Descriptions.Item>
            )}
          </Descriptions>
        </Flex>
      </Flex>
    </div>
  );
};

export default MovieDetailPanel;
