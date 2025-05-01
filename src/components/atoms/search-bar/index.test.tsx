import { act, fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import SearchBar from './index';

describe('SearchBar Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('renders with placeholder text', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} placeholder="Search movies..." />);

    const input = screen.getByPlaceholderText('Search movies...');
    expect(input).toBeInTheDocument();
  });

  test('updates input value on change', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Inception' } });

    expect(input).toHaveValue('Inception');
  });

  test('calls onSearch after debounce delay', async () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} delay={300} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Inception' } });

    // Before the delay
    expect(mockOnSearch).not.toHaveBeenCalled();

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // After the delay
    expect(mockOnSearch).toHaveBeenCalledWith('Inception');
  });

  test('clears input when clear button is clicked', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Inception' } });

    expect(input).toHaveValue('Inception');

    // Find and click the clear button (usually a button with role='button' within the search control)
    const clearButton = screen.getByRole('button');
    fireEvent.click(clearButton);

    // Fast-forward time to allow for debounce
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Input should be cleared and onSearch called with empty string
    expect(input).toHaveValue('');
    expect(mockOnSearch).toHaveBeenCalledWith('');
  });
});
