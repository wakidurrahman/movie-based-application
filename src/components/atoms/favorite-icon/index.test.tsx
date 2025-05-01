import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import FavoriteIcon from './index';

describe('FavoriteIcon Component', () => {
  test('renders filled heart when favorite', () => {
    const mockOnClick = vi.fn();
    render(<FavoriteIcon isFavorite={true} onClick={mockOnClick} />);

    // We can't easily check for specific icon, but we can check the aria-label
    const icon = screen.getByRole('button', { name: 'Remove from favorites' });
    expect(icon).toBeInTheDocument();
  });

  test('renders empty heart when not favorite', () => {
    const mockOnClick = vi.fn();
    render(<FavoriteIcon isFavorite={false} onClick={mockOnClick} />);

    const icon = screen.getByRole('button', { name: 'Add to favorites' });
    expect(icon).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const mockOnClick = vi.fn();
    render(<FavoriteIcon isFavorite={false} onClick={mockOnClick} />);

    const icon = screen.getByRole('button');
    fireEvent.click(icon);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('accepts custom size prop', () => {
    const mockOnClick = vi.fn();
    render(<FavoriteIcon isFavorite={false} onClick={mockOnClick} size={32} />);

    // We can't easily check the size in a test, but at least we can verify it renders
    const icon = screen.getByRole('button');
    expect(icon).toBeInTheDocument();
  });
});
