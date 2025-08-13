import { useQuery } from '@apollo/client';
import { GET_BIRD } from '../services/graphql/queries';
import type { GetBirdData, GetBirdVariables, Bird } from '../types';

/**
 * Custom hook for fetching a single bird by ID using Apollo Client
 * 
 * Features:
 * - Apollo's useQuery with variables for bird ID
 * - Normalized cache automatically handles updates
 * - Skip query when no bird selected (birdId is null/undefined)
 * - Built-in loading states and error handling
 * - Automatic refetching when birdId changes
 * 
 * @param birdId - The ID of the bird to fetch, or null/undefined to skip query
 */
export const useBird = (birdId: string | null | undefined) => {
  const { data, loading, error, refetch } = useQuery<GetBirdData, GetBirdVariables>(
    GET_BIRD,
    {
      variables: { id: birdId! }, // Non-null assertion safe due to skip condition
      skip: !birdId, // Skip query when no bird selected
      errorPolicy: 'all', // Handle partial errors gracefully
      notifyOnNetworkStatusChange: true, // Better loading state handling
    }
  );

  return {
    bird: data?.bird || null as Bird | null,
    loading,
    error,
    refetch, // Expose refetch for manual refresh if needed
  };
};
