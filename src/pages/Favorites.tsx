import { Empty, Typography } from 'antd';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../components/atoms/search-bar';
import MovieList from '../components/molecules/movie-list';
import Base from '../components/template/base';
import { selectFavoriteIds, toggleFavorite } from '../store/favoritesSlice';
import { Movie, selectAllMovies } from '../store/moviesSlice';
import { AppDispatch } from '../store/store';

const { Title } = Typography;

const Favorites = () => {
  const dispatch = useDispatch<AppDispatch>();
  const allMovies = useSelector(selectAllMovies);
  const favoriteIds = useSelector(selectFavoriteIds);

  // Filter movies to only show favorites
  const favoriteMovies = useMemo(() => {
    return allMovies.filter((movie: Movie) => favoriteIds.includes(movie.imdbID));
  }, [allMovies, favoriteIds]);

  // State for searched movies
  const [searchedMovies, setSearchedMovies] = React.useState(favoriteMovies);

  // Update searched movies when favorite movies change
  React.useEffect(() => {
    setSearchedMovies(favoriteMovies);
  }, [favoriteMovies]);

  // Handle search within favorites
  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setSearchedMovies(favoriteMovies);
      return;
    }

    const filtered = favoriteMovies.filter((movie: Movie) =>
      movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchedMovies(filtered);
  };

  // Handle favorite toggle
  const handleFavoriteToggle = (movieId: string) => {
    dispatch(toggleFavorite(movieId));
  };

  return (
    <Base>
      <div style={{ marginBottom: 32 }}>
        <Title level={2}>Your Favorite Movies</Title>

        <div style={{ marginBottom: 24 }}>
          <SearchBar onSearch={handleSearch} placeholder="Search in your favorites..." />
        </div>

        {favoriteMovies.length === 0 ? (
          <Empty
            description="You haven't added any favorites yet"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ) : (
          <MovieList
            movies={searchedMovies}
            favoriteIds={favoriteIds}
            onFavoriteToggle={handleFavoriteToggle}
          />
        )}
      </div>
    </Base>
  );
};

export default Favorites;
