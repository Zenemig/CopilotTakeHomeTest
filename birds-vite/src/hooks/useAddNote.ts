import { useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { ADD_NOTE } from '../services/graphql/mutations';
import { GET_BIRD } from '../services/graphql/queries';
import type { AddNoteVariables, GetBirdData } from '../types';

/**
 * Custom hook for adding notes to birds using Apollo Client mutations
 * 
 * Features:
 * - Apollo's useMutation with optimistic updates
 * - Automatic cache updates via update function
 * - Error handling with Apollo's error policies
 * - Automatic timestamp generation (32-bit seconds)
 * - Type-safe mutation with proper error handling
 * 
 * @returns Object with submitNote function, loading state, and error
 */
export const useAddNote = () => {
  const [addNote, { loading, error }] = useMutation<string, AddNoteVariables>(ADD_NOTE, {
    // Update Apollo cache after successful mutation
    update(cache, { data }, { variables }) {
      if (data && variables) {
        // Read the existing bird from cache
        const existingBird = cache.readQuery<GetBirdData>({
          query: GET_BIRD,
          variables: { id: variables.birdId },
        });

        if (existingBird?.bird) {
          // Write updated bird back to cache with new note
          cache.writeQuery({
            query: GET_BIRD,
            variables: { id: variables.birdId },
            data: {
              bird: {
                ...existingBird.bird,
                notes: [
                  ...existingBird.bird.notes,
                  {
                    id: data, // The mutation returns the new note ID
                    comment: variables.comment,
                    timestamp: variables.timestamp,
                    __typename: 'Note',
                  },
                ],
              },
            },
          });
        }
      }
    },
    // Optimistic response for immediate UI updates
    optimisticResponse: () => {
      return `temp-${Date.now()}`; // Temporary ID for optimistic update
    },
    errorPolicy: 'all', // Handle partial errors gracefully
  });

  /**
   * Submit a new note for a bird
   * 
   * @param birdId - ID of the bird to add note to
   * @param comment - The note comment text
   */
  const submitNote = useCallback(
    async (birdId: string, comment: string) => {
      try {
        const result = await addNote({
          variables: {
            birdId,
            comment,
            timestamp: Math.floor(Date.now() / 1000), // Convert to 32-bit seconds
          },
        });
        return result.data; // Return the new note ID
      } catch (err) {
        // Error handling with Apollo's error policies
        console.error('Failed to add note:', err);
        throw err; // Re-throw for component-level error handling
      }
    },
    [addNote]
  );

  return {
    submitNote,
    loading,
    error,
  };
};
