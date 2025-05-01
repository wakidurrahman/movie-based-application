import type { RootState } from '@/store/store';
import { addFavorite, getFavorites, removeFavorite } from '@/utils/storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  ids: string[];
}

// Initialize state with saved favorites from localStorage
const initialState: FavoritesState = {
  ids: getFavorites(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<string>) => {
      const movieId = action.payload;
      if (!state.ids.includes(movieId)) {
        state.ids.push(movieId);
        // Persist to localStorage
        addFavorite(movieId);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      const movieId = action.payload;
      state.ids = state.ids.filter(id => id !== movieId);
      // Persist to localStorage
      removeFavorite(movieId);
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const movieId = action.payload;
      if (state.ids.includes(movieId)) {
        state.ids = state.ids.filter(id => id !== movieId);
        removeFavorite(movieId);
      } else {
        state.ids.push(movieId);
        addFavorite(movieId);
      }
    },
  },
});

// Export actions and reducer
export const { addToFavorites, removeFromFavorites, toggleFavorite } = favoritesSlice.actions;

// Selectors
export const selectFavoriteIds = (state: RootState) => state.favorites.ids;
export const selectIsFavorite = (state: RootState, movieId: string) =>
  state.favorites.ids.includes(movieId);

export default favoritesSlice.reducer;
