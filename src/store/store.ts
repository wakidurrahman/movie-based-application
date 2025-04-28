import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';
import moviesReducer from './moviesSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    favorites: favoritesReducer,
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
