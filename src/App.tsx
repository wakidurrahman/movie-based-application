import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import ErrorBoundary from './components/organisms/error-boundary';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import { store } from './store/store';

const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#1677ff',
              borderRadius: 6,
            },
          }}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/movies" element={<Home />} />
              <Route path="/movies/:movieId" element={<MovieDetail />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="*" element={<Navigate to="/movies" replace />} />
            </Routes>
          </BrowserRouter>
        </ConfigProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
