import { Typography } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { config } from '../app.config';
import LoadingSpinner from '../components/atoms/LoadingSpinner';
import SearchBar from '../components/atoms/SearchBar';
import MovieList from '../components/molecules/MovieList';
import Base from '../components/template/Base';
import { selectFavoriteIds, toggleFavorite } from '../store/favoritesSlice';
import {
  fetchMovies,
  searchMoviesByTerm,
  selectAllMovies,
  selectMovieStatus,
  selectSearchResults,
} from '../store/moviesSlice';
import { AppDispatch } from '../store/store';

const { Title } = Typography;

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector(selectAllMovies);
  const searchResults = useSelector(selectSearchResults);
  const favoriteIds = useSelector(selectFavoriteIds);
  const status = useSelector(selectMovieStatus);
  const [searchTerm, setSearchTerm] = useState('');
  const initialLoadComplete = useRef(false);

  // Fetch movies on component mount - only run once
  useEffect(() => {
    // Prevent additional API calls if we already have movies or already started loading
    if (initialLoadComplete.current || status === 'loading' || movies.length > 0) {
      return;
    }

    console.log('Fetching movies on mount, isDev:', config.isDevelopment);
    dispatch(fetchMovies());
    initialLoadComplete.current = true;
  }, [dispatch, status, movies.length]);

  // Handle search
  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);

    if (!searchTerm.trim()) {
      // In dev mode, we already have all movies
      if (config.isDevelopment) {
        console.log('Empty search in dev mode, using all movies');
        return;
      }

      // In prod mode, fetch default movie if we don't have any movies yet
      if (movies.length === 0) {
        dispatch(fetchMovies());
      }
      return;
    }

    console.log('Searching for:', searchTerm);
    dispatch(searchMoviesByTerm(searchTerm));
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

  // Determine which movies to display
  const moviesToDisplay = searchTerm && searchResults.length > 0 ? searchResults : movies;
  console.log(
    'Movies to display:',
    moviesToDisplay.length,
    searchTerm ? 'from search' : 'from all movies'
  );

  if (searchTerm && searchResults.length === 0 && status !== 'loading') {
    console.log('No search results found for:', searchTerm);
  }

  return (
    <Base>
      <div style={{ marginBottom: 32 }}>
        <Title level={2}>Explore Movies</Title>
        <div style={{ marginBottom: 24 }}>
          <SearchBar onSearch={handleSearch} />
        </div>
        <MovieList
          movies={moviesToDisplay}
          favoriteIds={favoriteIds}
          onFavoriteToggle={handleFavoriteToggle}
        />
      </div>
    </Base>
  );
};

export default Home;
