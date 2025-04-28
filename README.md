# 🎬 Movie App

A responsive, movie-browsing SPA built with React, TypeScript, Vite, and Ant Design.

## Features

- Browse movie listings with details
- Search for movies by title
- View detailed information about each movie
- Add/remove movies to favorites
- Responsive design for all devices

## Tech Stack

- React 18 + TypeScript
- Vite as build tool
- Ant Design for UI components
- Redux Toolkit for state management
- React Router for navigation
- Axios for API requests
- React Icons for icons

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/movie-app.git
cd movie-app

# Install dependencies
npm install
# or
yarn
```

### Development

```bash
# Start the development server
npm run dev
# or
yarn dev
```

This will start the development server at `http://localhost:5173`.

### Production Build

```bash
# Build for production
npm run build
# or
yarn build

# Preview the production build
npm run preview
# or
yarn preview
```

## Project Structure

The project follows an atomic design pattern:

```
src/
├─ api/
│  └─ axiosInstance.ts
├─ components/
│  ├─ atoms/
│  ├─ molecules/
│  ├─ organisms/
│  └─ template/
├─ data/
│  └─ dummy.json
├─ pages/
├─ store/
├─ utils/
└─ App.tsx
```

## License

This project is licensed under the MIT License.

---

Completed:
✅ Created project using Vite with React + TypeScript
✅ Set up the atomic design folder structure
✅ Added Ant Design components
✅ Created Axios instance with interceptors
✅ Set up Redux store with movies and favorites slices
✅ Implemented localStorage persistence for favorites
✅ Added dummy.json with 10 movie objects
✅ Created responsive UI components for all screens
✅ Implemented search functionality with debounce
✅ Added favorite toggling functionality
✅ Set up routing for home and movie detail pages
✅ Created detailed movie view with all metadata

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
