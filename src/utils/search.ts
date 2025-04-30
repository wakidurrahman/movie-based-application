import { useCallback, useRef, useState } from 'react';

/**
 * Custom hook for debounced search functionality
 * @param initialSearchTerm Initial search term
 * @param onSearch Callback function to run when search is performed
 * @param debounceTime Debounce time in milliseconds
 * @returns Search utils: searchTerm, setSearchTerm, isSearchActive, debouncedSearch
 */
export const useSearch = <T>(
  initialSearchTerm = '',
  onSearch: (term: string) => Promise<T> | void,
  debounceTime = 500
) => {
  // Search term state
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Refs for handling debounce
  const searchTimeoutRef = useRef<number | null>(null);
  const activeSearchRef = useRef<string | null>(null);

  // Handle searching with debounce
  const debouncedSearch = useCallback(
    (term: string) => {
      // Clear any pending search timeout
      if (searchTimeoutRef.current) {
        window.clearTimeout(searchTimeoutRef.current);
        searchTimeoutRef.current = null;
      }

      // Update search term immediately
      setSearchTerm(term);

      // Handle empty search
      if (!term.trim()) {
        setIsSearchActive(false);
        activeSearchRef.current = null;
        return;
      }

      // Don't search again for the same term
      if (term === activeSearchRef.current) {
        return;
      }

      // Debounce the search
      searchTimeoutRef.current = window.setTimeout(() => {
        // Mark this term as the active search
        activeSearchRef.current = term;
        setIsSearchActive(true);

        // Clear the timeout reference
        searchTimeoutRef.current = null;

        // Execute the search
        onSearch(term);
      }, debounceTime);
    },
    [onSearch, debounceTime]
  );

  return {
    searchTerm,
    setSearchTerm,
    isSearchActive,
    debouncedSearch,
  };
};
