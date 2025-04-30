import { ArrowLeftOutlined, StarFilled, StarOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Image,
  Rate,
  Row,
  Space,
  Statistic,
  Tag,
  Typography,
} from 'antd';
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
    !movie.Poster || movie.Poster === 'N/A' ? 'https://placehold.jp/300x450.png' : movie.Poster;

  return (
    <div className="o-movie-detail-panel">
      <Row gutter={[0, 24]}>
        {/* Back button */}
        <Col span={24}>
          <Link to="/movies">
            <Button type="text" icon={<ArrowLeftOutlined />}>
              Back to Movies
            </Button>
          </Link>
        </Col>

        {/* Title section */}
        <Col span={24}>
          <Title level={1} className="o-movie-detail-panel__title">
            {movie.Title || 'Unknown Title'} <Text type="secondary">({movie.Year || 'N/A'})</Text>
          </Title>
        </Col>

        {/* Main content */}
        <Col span={24}>
          <Row gutter={24}>
            {/* Left column - Poster */}
            <Col xs={24} sm={24} md={8} lg={6}>
              <Card
                cover={
                  <Image
                    alt={movie.Title || 'Movie poster'}
                    src={imageSrc}
                    fallback="https://placehold.jp/300x450.png"
                  />
                }
                actions={[
                  <Button
                    type="text"
                    onClick={onFavoriteToggle}
                    icon={<FavoriteIcon isFavorite={isFavorite} onClick={() => {}} size={20} />}
                  >
                    {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                  </Button>,
                ]}
              >
                {movie.Poster && movie.Poster !== 'N/A' && (
                  <Card.Meta
                    description={
                      <Space direction="vertical" size="small">
                        <Text type="secondary">Released: {movie.Released || 'N/A'}</Text>
                        <Text type="secondary">Runtime: {movie.Runtime || 'N/A'}</Text>
                        <Text type="secondary">Rated: {movie.Rated || 'N/A'}</Text>
                      </Space>
                    }
                  />
                )}
              </Card>

              {/* Photos section */}
              <Card
                title="Photos"
                className="o-movie-detail-panel__photos-card"
                style={{ marginTop: 16 }}
              >
                <div className="o-movie-detail-panel__photos">
                  <Avatar shape="square" size={64} src={imageSrc} />
                  <Avatar shape="square" size={64} src={imageSrc} />
                  <Avatar shape="square" size={64} src={imageSrc} />
                  <Button type="text">See all photos</Button>
                </div>
              </Card>
            </Col>

            {/* Right column - Movie details */}
            <Col xs={24} sm={24} md={16} lg={18}>
              {/* Ratings row */}
              <Row gutter={16} className="o-movie-detail-panel__ratings">
                <Col>
                  <Statistic
                    title={
                      <>
                        <StarFilled style={{ color: '#fadb14' }} /> IMDb RATING
                      </>
                    }
                    value={movie.imdbRating || 'N/A'}
                    suffix="/10"
                    valueStyle={{ fontSize: '2rem' }}
                  />
                  <Text type="secondary">
                    {movie.imdbVotes && movie.imdbVotes !== 'N/A'
                      ? `${movie.imdbVotes} votes`
                      : 'No votes'}
                  </Text>
                </Col>

                <Divider type="vertical" style={{ height: '60px' }} />

                <Col>
                  <Statistic
                    title="YOUR RATING"
                    value={0}
                    formatter={() => (
                      <Rate allowHalf defaultValue={0} character={<StarOutlined />} />
                    )}
                  />
                  <Text type="secondary">Rate this</Text>
                </Col>

                <Divider type="vertical" style={{ height: '60px' }} />

                <Col>
                  <Statistic
                    title="POPULARITY"
                    value={movie.Metascore || 'N/A'}
                    valueStyle={{ fontSize: '2rem' }}
                  />
                  <Text type="secondary">Metascore</Text>
                </Col>
              </Row>

              {/* Categories */}
              <Space size={[8, 16]} wrap style={{ margin: '24px 0' }}>
                {movie.Genre && typeof movie.Genre === 'string' ? (
                  movie.Genre.split(', ').map((genre, index) => (
                    <Tag key={index} className="o-movie-detail-panel__genre-tag">
                      {genre}
                    </Tag>
                  ))
                ) : (
                  <Tag>Genre N/A</Tag>
                )}
              </Space>

              {/* Plot */}
              <Paragraph className="o-movie-detail-panel__plot">
                {movie.Plot || 'No plot description available.'}
              </Paragraph>

              <Divider />

              {/* Credits section */}
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={8}>
                  <Title level={5}>Director</Title>
                  <Text>{movie.Director || 'N/A'}</Text>
                </Col>

                <Col xs={24} sm={8}>
                  <Title level={5}>Writers</Title>
                  <Text>{movie.Writer || 'N/A'}</Text>
                </Col>

                <Col xs={24} sm={8}>
                  <Title level={5}>Stars</Title>
                  <Text>{movie.Actors || 'N/A'}</Text>
                </Col>
              </Row>

              <Divider />

              {/* Additional details */}
              <Card title="Details" bordered={false}>
                <Descriptions layout="vertical" column={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
                  <Descriptions.Item label="Country">{movie.Country || 'N/A'}</Descriptions.Item>
                  <Descriptions.Item label="Language">{movie.Language || 'N/A'}</Descriptions.Item>
                  <Descriptions.Item label="Awards">{movie.Awards || 'N/A'}</Descriptions.Item>
                  {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
                    <Descriptions.Item label="Box Office">{movie.BoxOffice}</Descriptions.Item>
                  )}
                  {movie.DVD && movie.DVD !== 'N/A' && (
                    <Descriptions.Item label="DVD Release">{movie.DVD}</Descriptions.Item>
                  )}
                  {movie.Production && movie.Production !== 'N/A' && (
                    <Descriptions.Item label="Production">{movie.Production}</Descriptions.Item>
                  )}
                </Descriptions>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default MovieDetailPanel;
