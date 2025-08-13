import { useQuery } from '@apollo/client';
import { GET_BIRDS } from '../services/graphql/queries';
import type { GetBirdsData, Bird } from '../types';

/**
 * Custom hook for fetching all birds using Apollo Client
 * 
 * Features:
 * - Built-in loading states and error handling
 * - Automatic caching via Apollo's InMemoryCache
 * - Error boundary integration ready
 * - Returns normalized data structure
 */
export const useBirds = () => {
  const { data, loading, error, refetch } = useQuery<GetBirdsData>(GET_BIRDS, {
    errorPolicy: 'all', // Handle partial errors gracefully
    notifyOnNetworkStatusChange: true, // Better loading state handling
  });

  return {
    birds: data?.birds || [] as Bird[],
    loading,
    error,
    refetch, // Expose refetch for manual refresh if needed
  };
};
