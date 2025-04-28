import { Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../components/atoms/LoadingSpinner';
import SearchBar from '../components/atoms/SearchBar';
import MovieList from '../components/molecules/MovieList';
import Base from '../components/template/Base';
import { selectFavoriteIds, toggleFavorite } from '../store/favoritesSlice';
import { fetchMovies, Movie, selectAllMovies, selectMovieStatus } from '../store/moviesSlice';
import { AppDispatch } from '../store/store';

const { Title } = Typography;

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector(selectAllMovies);
  const favoriteIds = useSelector(selectFavoriteIds);
  const status = useSelector(selectMovieStatus);
  const [filteredMovies, setFilteredMovies] = useState(movies);

  // Fetch movies on component mount
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMovies());
    }
  }, [status, dispatch]);

  // Update filtered movies when movies are loaded
  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);

  // Handle search
  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredMovies(movies);
      return;
    }

    const filtered = movies.filter((movie: Movie) =>
      movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  // Handle favorite toggle
  const handleFavoriteToggle = (movieId: string) => {
    dispatch(toggleFavorite(movieId));
  };

  // Show loading state
  if (status === 'loading' && movies.length === 0) {
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

  return (
    <Base>
      <div style={{ marginBottom: 32 }}>
        <Title level={2}>Explore Movies</Title>
        <div style={{ marginBottom: 24 }}>
          <SearchBar onSearch={handleSearch} />
        </div>
        <MovieList
          movies={filteredMovies}
          favoriteIds={favoriteIds}
          onFavoriteToggle={handleFavoriteToggle}
        />
      </div>
    </Base>
  );
};

export default Home;
