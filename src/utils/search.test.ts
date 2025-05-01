import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { useSearch } from './search';

describe('useSearch Hook', () => {
  // Setup for testing setTimeout
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('should initialize with default values', () => {
    const onSearch = vi.fn();
    const { result } = renderHook(() => useSearch('', onSearch));

    expect(result.current.searchTerm).toBe('');
    expect(result.current.isSearchActive).toBe(false);
  });

  test('should initialize with provided initial search term', () => {
    const initialTerm = 'initial search';
    const onSearch = vi.fn();
    const { result } = renderHook(() => useSearch(initialTerm, onSearch));

    expect(result.current.searchTerm).toBe(initialTerm);
  });

  test('should update search term immediately when debouncedSearch is called', () => {
    const onSearch = vi.fn();
    const { result } = renderHook(() => useSearch('', onSearch));

    act(() => {
      result.current.debouncedSearch('new term');
    });

    expect(result.current.searchTerm).toBe('new term');
    expect(onSearch).not.toHaveBeenCalled(); // Search not called yet due to debounce
  });

  test('should call onSearch after debounce time', () => {
    const onSearch = vi.fn();
    const { result } = renderHook(() => useSearch('', onSearch, 500));

    act(() => {
      result.current.debouncedSearch('test search');
    });

    expect(result.current.searchTerm).toBe('test search');
    expect(onSearch).not.toHaveBeenCalled(); // Not called immediately

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(onSearch).toHaveBeenCalledWith('test search');
    expect(result.current.isSearchActive).toBe(true);
  });

  test('should clear previous timeout when debouncedSearch is called multiple times', () => {
    const onSearch = vi.fn();
    const { result } = renderHook(() => useSearch('', onSearch, 500));

    act(() => {
      result.current.debouncedSearch('first search');
    });

    // Call again before debounce time expires
    act(() => {
      result.current.debouncedSearch('second search');
    });

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Only the last search should be executed
    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith('second search');
    expect(result.current.searchTerm).toBe('second search');
  });

  test('should not call onSearch for empty search terms', () => {
    const onSearch = vi.fn();
    const { result } = renderHook(() => useSearch('initial', onSearch, 500));

    act(() => {
      result.current.debouncedSearch('');
    });

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(onSearch).not.toHaveBeenCalled();
    expect(result.current.isSearchActive).toBe(false);
  });

  test('should not duplicate search for the same term', () => {
    const onSearch = vi.fn();
    const { result } = renderHook(() => useSearch('', onSearch, 500));

    // First search
    act(() => {
      result.current.debouncedSearch('same term');
    });

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(onSearch).toHaveBeenCalledTimes(1);

    // Same search again
    act(() => {
      result.current.debouncedSearch('same term');
    });

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // onSearch should not be called again for the same term
    expect(onSearch).toHaveBeenCalledTimes(1);
  });
});
