import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  addFavorite,
  getFavorites,
  getToken,
  isFavorite,
  removeFavorite,
  removeToken,
  setToken,
} from './storage';

describe('Storage Utilities', () => {
  // Mock localStorage
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: vi.fn((key: string) => store[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value.toString();
      }),
      removeItem: vi.fn((key: string) => {
        delete store[key];
      }),
      clear: vi.fn(() => {
        store = {};
      }),
    };
  })();

  // Setup and teardown
  beforeEach(() => {
    // Replace the real localStorage with our mock
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });

    // Clear localStorage before each test
    localStorageMock.clear();
  });

  afterEach(() => {
    // Reset all mocks after each test
    vi.clearAllMocks();
  });

  // Token tests
  test('setToken should store token in localStorage', () => {
    const token = 'test-token';
    setToken(token);

    expect(localStorageMock.setItem).toHaveBeenCalledWith('movie_app_token', token);
  });

  test('getToken should retrieve token from localStorage', () => {
    const token = 'test-token';
    localStorageMock.setItem('movie_app_token', token);

    const result = getToken();

    expect(localStorageMock.getItem).toHaveBeenCalledWith('movie_app_token');
    expect(result).toBe(token);
  });

  test('removeToken should remove token from localStorage', () => {
    const token = 'test-token';
    localStorageMock.setItem('movie_app_token', token);

    removeToken();

    expect(localStorageMock.removeItem).toHaveBeenCalledWith('movie_app_token');
  });

  // Favorites tests
  test('getFavorites should return empty array when no favorites exist', () => {
    const favorites = getFavorites();

    expect(localStorageMock.getItem).toHaveBeenCalledWith('movie_app_favorites');
    expect(favorites).toEqual([]);
  });

  test('getFavorites should parse and return favorites from localStorage', () => {
    const favoritesArray = ['movie1', 'movie2'];
    localStorageMock.setItem('movie_app_favorites', JSON.stringify(favoritesArray));

    const favorites = getFavorites();

    expect(localStorageMock.getItem).toHaveBeenCalledWith('movie_app_favorites');
    expect(favorites).toEqual(favoritesArray);
  });

  test('addFavorite should add movie ID to favorites if not already present', () => {
    const movieId = 'movie1';
    const result = addFavorite(movieId);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'movie_app_favorites',
      JSON.stringify([movieId])
    );
    expect(result).toEqual([movieId]);
  });

  test('addFavorite should not add duplicate movie ID', () => {
    const movieId = 'movie1';

    // Mock implementation of getFavorites to return an array that already includes the movieId
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify([movieId]));

    const result = addFavorite(movieId);

    // Verify getFavorites was called
    expect(localStorageMock.getItem).toHaveBeenCalledWith('movie_app_favorites');

    // Verify the result is an array with the movieId
    expect(result).toEqual([movieId]);

    // Verify setItem was NOT called since the movie was already in favorites
    expect(localStorageMock.setItem).not.toHaveBeenCalled();
  });

  test('removeFavorite should remove movie ID from favorites', () => {
    const movieIds = ['movie1', 'movie2', 'movie3'];
    localStorageMock.setItem('movie_app_favorites', JSON.stringify(movieIds));

    const result = removeFavorite('movie2');

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'movie_app_favorites',
      JSON.stringify(['movie1', 'movie3'])
    );
    expect(result).toEqual(['movie1', 'movie3']);
  });

  test('isFavorite should return true when movie ID is in favorites', () => {
    const movieIds = ['movie1', 'movie2'];
    localStorageMock.setItem('movie_app_favorites', JSON.stringify(movieIds));

    const result = isFavorite('movie2');

    expect(result).toBe(true);
  });

  test('isFavorite should return false when movie ID is not in favorites', () => {
    const movieIds = ['movie1', 'movie2'];
    localStorageMock.setItem('movie_app_favorites', JSON.stringify(movieIds));

    const result = isFavorite('movie3');

    expect(result).toBe(false);
  });
});
