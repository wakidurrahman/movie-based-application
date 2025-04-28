// Constants for storage keys
const STORAGE_KEYS = {
  TOKEN: 'movie_app_token',
  FAVORITES: 'movie_app_favorites',
};

// Token operations
export const getToken = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
};

export const setToken = (token: string): void => {
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
};

export const removeToken = (): void => {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
};

// Favorites operations
export const getFavorites = (): string[] => {
  const favoritesJSON = localStorage.getItem(STORAGE_KEYS.FAVORITES);
  return favoritesJSON ? JSON.parse(favoritesJSON) : [];
};

export const addFavorite = (movieId: string): string[] => {
  const favorites = getFavorites();
  if (!favorites.includes(movieId)) {
    favorites.push(movieId);
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  }
  return favorites;
};

export const removeFavorite = (movieId: string): string[] => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter(id => id !== movieId);
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updatedFavorites));
  return updatedFavorites;
};

export const isFavorite = (movieId: string): boolean => {
  const favorites = getFavorites();
  return favorites.includes(movieId);
};
