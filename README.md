# 🎬 Movie App

A responsive, movie-browsing SPA built with React 19, TypeScript, Vite, and Ant Design.

## Features

- Browse movie listings with details
- Search for movies by title
- View detailed information about each movie
- Add/remove movies to favorites (persisted in localStorage)
- Responsive design for all devices
- Error boundary for graceful error handling
- Comprehensive test coverage

## Tech Stack

- **Framework:** React 19 + TypeScript (via Vite)
- **UI Library:** Ant Design components (Grid, Card, Input, Button, Layout)
- **HTTP Client:** Axios with request/response interceptors for:
  - Content-Type: application/json
  - JWT Auth with token from localStorage
  - Global error handling
- **State Management:** Redux Toolkit for centralized state
  - Movies slice with async thunks for data fetching
  - Favorites slice synced with localStorage
- **Routing:** React Router v7 for navigation
- **Icons:** React-Icons for heart/favorite toggles
- **Storage:** LocalStorage for favorites persistence
- **Testing:** Vitest with React Testing Library
- **Code Quality:** ESLint + Prettier

## Getting Started

### Prerequisites

- Node.js (v22.14.0 or later)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/wakidurrahman/movie-based-application.git


# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

This will start the development server at `http://localhost:5173`.

### Scripts

```bash
# Build for production
npm run build

# Preview the production build
npm run preview

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Format code
npm run format

# Lint code
npm run lint
```

## Project Structure

The project follows an atomic design pattern:

```bash
src/
├─ api/
│  └─ axiosInstance.ts           # Axios with interceptors
├─ components/
│  ├─ atoms/                     # Basic building blocks
│  │  ├─ SearchBar.tsx           # Debounced search input
│  │  ├─ RHFInputField.tsx       # Reusable input field
│  │  ├─ FavoriteIcon.tsx        # Toggleable heart icon
│  │  └─ LoadingSpinner.tsx      # Loading indicator
│  ├─ molecules/                 # Combinations of atoms
│  │  └─ MovieList.tsx           # Grid of movie cards
│  ├─ organisms/                 # Complex components
│  │  ├─ Header.tsx              # App header with navigation
│  │  ├─ Footer.tsx              # App footer
│  │  ├─ MovieCard.tsx           # Individual movie card
│  │  └─ MovieDetailPanel.tsx    # Detailed movie view
│  └─ template/                  # Page layouts
│     ├─ Base.tsx                # Base page layout template
├─ data/
│  └─ dummy.json                 # Mock movie data (10 objects)
├─ pages/
│  ├─ Home.tsx                   # Main movie listing page
│  ├─ Favorites.tsx              # User's favorite movies
│  └─ MovieDetail.tsx            # Individual movie details
├─ store/
│  ├─ moviesSlice.ts             # Redux slice for movies
│  ├─ favoritesSlice.ts          # Redux slice for favorites
│  └─ store.ts                   # Redux store configuration
├─ utils/
│  └─ storage.ts                 # LocalStorage utilities
├─ test/
│  └─ setup.ts                   # Vitest setup and mocks
├─ App.tsx                       # Main application component
├─ ErrorBoundary.tsx             # Error handling component
└─ app.config.ts                 # Environment configuration
```

## Application Flow

1. **Data Fetching:** The app fetches movie data from the local `dummy.json` file using Redux Toolkit's `createAsyncThunk`
2. **Home Page:**
   - Shows a list of movie cards with essential information
   - Displays a loading spinner during data fetching
   - Provides search functionality with debounced filtering
   - Allows toggling favorites
3. **Movie Details:**
   - Accessed by clicking on a movie card
   - Loads data from Redux or fetches if missing
   - Shows comprehensive movie information
   - Includes a back to home button
   - Maintains favorite toggle functionality
4. **Favorites Page:**
   - Displays only user's favorited movies
   - Provides search within favorites
   - Shows empty state when no favorites exist
   - Maintains favorite toggle functionality

## Data Management

- **Redux Store:** Centralized state management
  - Movies slice stores all movie data
  - Favorites slice tracks user's favorite movie IDs
- **Async Operations:** Redux Toolkit's `createAsyncThunk` for data fetching
- **Persistence:** Favorites synced with localStorage through utility functions
- **API Communication:** Axios instance with interceptors for authentication and error handling

## Development Tools

- **VS Code Configuration:** Optimized settings for development
  - Format on save with Prettier
  - ESLint integration
  - Debug configurations
- **Code Quality:**
  - ESLint with TypeScript and React plugins
  - Prettier for consistent formatting
  - TypeScript for type safety
- **Testing:**
  - Vitest configuration
  - React Testing Library for component tests
  - Mock implementations for external dependencies

## License

This project is licensed under the MIT License.
