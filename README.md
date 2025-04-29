# 🎬 Movie App

A responsive, movie-browsing SPA built with React, TypeScript, Vite, Ant Design, and SCSS.

## Features

- Browse movie listings with details
- Search for movies by title
- View detailed information about each movie
- Add/remove movies to favorites (persisted in localStorage)
- Responsive design for all devices
- Error boundary for graceful error handling
- Comprehensive test coverage

## Tech Stack

- **Framework:** React + TypeScript (via Vite)
- **UI Library:** Ant Design components (Grid, Card, Input, Button, Layout)
- **Styling:** SCSS with BEM methodology
- **HTTP Client:** Axios with request/response interceptors for:
  - Content-Type: application/json
  - JWT Auth with token from localStorage
  - Global error handling
  - API response caching
- **State Management:** Redux Toolkit for centralized state
  - Movies slice with async thunks for data fetching
  - Favorites slice synced with localStorage
- **Routing:** React Router for navigation
- **Icons:** React-Icons for heart/favorite toggles
- **Storage:** LocalStorage for favorites persistence
- **Testing:** Vitest with React Testing Library
- **Code Quality:** ESLint + Prettier

## Getting Started

### Prerequisites

- Node.js (v22.14.0 or later)
- npm (v10.8.2 or later)

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
# Start development server
npm run dev

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

## Environment Configuration

The application supports different environments through the `app.config.ts` file:

- **Development Mode:**

  - Uses local dummy data from `src/data/dummy.json`
  - No API calls to external services
  - Simplified development workflow

- **Production Mode:**
  - Connects to OMDB API
  - Uses API key for authentication
  - Implements proper error handling

The environment is automatically detected based on the `MODE` environment variable, and can be explicitly set when running scripts:

```bash
# Run in development mode
npm run dev

# Build for production
npm run build

# Run preview
npm run preview
```

## Project Structure

The project follows an atomic design pattern with a component-focused folder structure:

```bash
src/
├─ api/
│  └─ axiosInstance.ts           # Centralized Axios instance with interceptors
├─ assets/                       # Static assets
├─ components/
│  ├─ atoms/                     # Basic building blocks
│  │  ├─ favorite-icon/          # Toggleable heart icon component
│  │  │  ├─ index.tsx
│  │  │  └─ index.scss
│  │  ├─ loading-spinner/        # Loading indicator component
│  │  │  ├─ index.tsx
│  │  │  └─ index.scss
│  │  └─ search-bar/             # Debounced search input component
│  │     ├─ index.tsx
│  │     └─ index.scss
│  ├─ molecules/                 # Combinations of atoms
│  │  └─ movie-list/             # Grid of movie cards
│  │     ├─ index.tsx
│  │     └─ index.scss
│  ├─ organisms/                 # Complex components
│  │  ├─ error-boundary/         # Error handling component
│  │  │  ├─ index.tsx
│  │  │  └─ index.scss
│  │  ├─ footer/                 # App footer component
│  │  │  ├─ index.tsx
│  │  │  └─ index.scss
│  │  ├─ header/                 # App header with navigation
│  │  │  ├─ index.tsx
│  │  │  └─ index.scss
│  │  ├─ movie-card/             # Individual movie card
│  │  │  ├─ index.tsx
│  │  │  ├─ index.test.tsx
│  │  │  └─ index.scss
│  │  └─ movie-detail-panel/     # Detailed movie view
│  │     ├─ index.tsx
│  │     └─ index.scss
│  └─ template/                  # Page layouts
│     └─ base/                   # Base page layout template
│        ├─ index.tsx
│        └─ index.scss
├─ config/
│  └─ app.config.ts              # Environment configuration
├─ data/
│  └─ dummy.json                 # Mock movie data for development
├─ pages/
│  ├─ Home.tsx                   # Main movie listing page
│  ├─ Favorites.tsx              # User's favorite movies
│  └─ MovieDetail.tsx            # Individual movie details
├─ services/
│  └─ movieService.ts            # Movie API service with caching
├─ store/
│  ├─ moviesSlice.ts             # Redux slice for movies
│  ├─ favoritesSlice.ts          # Redux slice for favorites
│  └─ store.ts                   # Redux store configuration
├─ utils/
│  └─ storage.ts                 # LocalStorage utilities
├─ test/
│  └─ setup.ts                   # Vitest setup and mocks
├─ App.tsx                       # Main application component
├─ main.tsx                      # Application entry point
├─ App.scss                      # Global application styles
└─ index.scss                    # Base styles and resets
```

## BEM Methodology

The project uses BEM (Block, Element, Modifier) methodology for CSS with SCSS:

- **Blocks:** Component types are prefixed:

  - `a-` for atoms (e.g., `a-favorite-icon`)
  - `m-` for molecules (e.g., `m-movie-list`)
  - `o-` for organisms (e.g., `o-movie-card`)
  - `t-` for templates (e.g., `t-base`)

- **Elements:** Denoted by double underscores

  - `.a-favorite-icon__button`
  - `.m-movie-list__row`

- **Modifiers:** Denoted by double hyphens
  - `.o-loading-spinner--fullscreen`

## Application Flow

1. **Data Fetching:** The app fetches movie data from:

   - Development mode: Local `dummy.json` file
   - Production mode: OMDB API via axios

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
- **Caching:** API responses are cached to prevent duplicate requests

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
