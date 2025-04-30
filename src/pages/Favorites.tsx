import { Empty, Flex, Typography } from 'antd';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../components/atoms/search-bar';
import MovieList from '../components/molecules/movie-list';
import Base from '../components/template/base/';
import { selectFavoriteIds, toggleFavorite } from '../store/favoritesSlice';
import { Movie, selectAllMovies } from '../store/moviesSlice';
import { AppDispatch } from '../store/store';
import { useSearch } from '../utils/search';

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

  // Set up search with the utility hook
  const { searchTerm, debouncedSearch } = useSearch('', term => {
    if (!term.trim()) {
      setSearchedMovies(favoriteMovies);
      return;
    }

    const filtered = favoriteMovies.filter((movie: Movie) =>
      movie.Title.toLowerCase().includes(term.toLowerCase())
    );
    setSearchedMovies(filtered);
  });

  // Handle favorite toggle
  const handleFavoriteToggle = (movieId: string) => {
    dispatch(toggleFavorite(movieId));
  };

  return (
    <Base>
      <Flex vertical align="center" justify="space-between" gap={24}>
        <Title level={2}>Your Favorite Movies</Title>

        <SearchBar onSearch={debouncedSearch} placeholder="Search in your favorites..." />

        {searchedMovies.length === 0 && favoriteMovies.length > 0 && (
          <Empty
            className="m-movie-list__empty"
            description={`No results found for "${searchTerm}"`}
          />
        )}

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
      </Flex>
    </Base>
  );
};

export default Favorites;
