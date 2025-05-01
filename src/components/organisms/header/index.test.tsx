import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, test } from 'vitest';
import Header from './index';

describe('Header Component', () => {
  const renderWithRouter = (path: string) => {
    return render(
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="*" element={<Header />} />
        </Routes>
      </MemoryRouter>
    );
  };

  test('renders app logo with link to movies page', () => {
    renderWithRouter('/');

    const logo = screen.getByText('🎬 Movies');
    expect(logo).toBeInTheDocument();
    expect(logo.closest('a')).toHaveAttribute('href', '/movies');
  });

  test('renders navigation menu with Home and Favorites links', () => {
    renderWithRouter('/');

    const homeLink = screen.getByText('Home');
    const favoritesLink = screen.getByText('Favorites');

    expect(homeLink).toBeInTheDocument();
    expect(favoritesLink).toBeInTheDocument();

    expect(homeLink.closest('a')).toHaveAttribute('href', '/movies');
    expect(favoritesLink.closest('a')).toHaveAttribute('href', '/favorites');
  });

  test('highlights Home menu item when on home route', () => {
    renderWithRouter('/movies');

    // In Ant Design, selected menu items have a specific class
    const homeMenuItem = screen.getByText('Home').closest('li');
    expect(homeMenuItem).toHaveClass('ant-menu-item-selected');

    const favoritesMenuItem = screen.getByText('Favorites').closest('li');
    expect(favoritesMenuItem).not.toHaveClass('ant-menu-item-selected');
  });

  test('highlights Favorites menu item when on favorites route', () => {
    renderWithRouter('/favorites');

    const homeMenuItem = screen.getByText('Home').closest('li');
    expect(homeMenuItem).not.toHaveClass('ant-menu-item-selected');

    const favoritesMenuItem = screen.getByText('Favorites').closest('li');
    expect(favoritesMenuItem).toHaveClass('ant-menu-item-selected');
  });

  test('treats root path as home route for menu highlighting', () => {
    renderWithRouter('/');

    const homeMenuItem = screen.getByText('Home').closest('li');
    expect(homeMenuItem).toHaveClass('ant-menu-item-selected');
  });
});
