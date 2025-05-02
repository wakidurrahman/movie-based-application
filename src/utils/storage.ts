/**
 * @fileoverview Utility functions for browser localStorage operations.
 * This module provides functions to manage authentication tokens and user favorites.
 */

/**
 * Constants for localStorage keys to avoid magic strings throughout the application.
 */
const STORAGE_KEYS = {
  /** Key for storing the authentication token */
  TOKEN: 'movie_app_token',
  /** Key for storing the user's favorite movies */
  FAVORITES: 'movie_app_favorites',
};

/**
 * Token operations
 */

/**
 * Retrieves the authentication token from localStorage.
 * @returns {string|null} The stored token or null if not found
 */
export const getToken = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
};

/**
 * Stores the authentication token in localStorage.
 * @param {string} token - The token to store
 */
export const setToken = (token: string): void => {
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
};

/**
 * Removes the authentication token from localStorage.
 * Used during logout or token invalidation.
 */
export const removeToken = (): void => {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
};

/**
 * Favorites operations
 */

/**
 * Retrieves the user's favorite movies from localStorage.
 * @returns {string[]} Array of movie IDs, or empty array if none found
 */
export const getFavorites = (): string[] => {
  const favoritesJSON = localStorage.getItem(STORAGE_KEYS.FAVORITES);
  return favoritesJSON ? JSON.parse(favoritesJSON) : [];
};

/**
 * Adds a movie to the user's favorites.
 * @param {string} movieId - The ID of the movie to add
 * @returns {string[]} Updated array of favorite movie IDs
 */
export const addFavorite = (movieId: string): string[] => {
  const favorites = getFavorites();
  if (!favorites.includes(movieId)) {
    favorites.push(movieId);
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  }
  return favorites;
};

/**
 * Removes a movie from the user's favorites.
 * @param {string} movieId - The ID of the movie to remove
 * @returns {string[]} Updated array of favorite movie IDs
 */
export const removeFavorite = (movieId: string): string[] => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter(id => id !== movieId);
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updatedFavorites));
  return updatedFavorites;
};

/**
 * Checks if a movie is in the user's favorites.
 * @param {string} movieId - The ID of the movie to check
 * @returns {boolean} True if the movie is a favorite, false otherwise
 */
export const isFavorite = (movieId: string): boolean => {
  const favorites = getFavorites();
  return favorites.includes(movieId);
};
