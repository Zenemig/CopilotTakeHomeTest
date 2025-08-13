import { useState, useEffect, useMemo } from 'react';
import type { Bird } from '../types';

/**
 * Custom hook for client-side bird search with debounced filtering
 * 
 * Features:
 * - Debounced search (400ms) using useEffect + cleanup
 * - useMemo for optimized filtering performance
 * - Case-insensitive filtering on both name fields
 * - Returns filtered results + loading state during debounce
 * - Efficient re-rendering with proper dependency arrays
 * 
 * @param birds - Array of birds to search through
 * @returns Object with query, setQuery, filteredBirds, and isSearching state
 */
export const useSearch = (birds: Bird[]) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Debounce the search query (400ms)
  useEffect(() => {
    if (query !== debouncedQuery) {
      setIsSearching(true);
    }

    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setIsSearching(false);
    }, 400); // 400ms debounce as specified in plan

    return () => clearTimeout(timer); // Cleanup on unmount or query change
  }, [query, debouncedQuery]);

  // Filter birds based on debounced query (case-insensitive)
  const filteredBirds = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return birds; // Return all birds when no search query
    }

    const searchTerm = debouncedQuery.toLowerCase(); // Convert search to lowercase
    return birds.filter(
      (bird) =>
        bird.english_name.toLowerCase().includes(searchTerm) || // Case-insensitive English name
        bird.latin_name.toLowerCase().includes(searchTerm) // Case-insensitive Latin name
    );
  }, [birds, debouncedQuery]);

  /**
   * Clear the search query
   */
  const clearSearch = () => {
    setQuery('');
  };

  return {
    query,
    setQuery,
    filteredBirds,
    isSearching,
    clearSearch,
    // Expose debounced query for external use if needed
    debouncedQuery,
  };
};
