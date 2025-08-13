import { gql } from '@apollo/client';

export const ADD_NOTE = gql`
  mutation AddNote($birdId: ID!, $comment: String!, $timestamp: Int!) {
    addNote(birdId: $birdId, comment: $comment, timestamp: $timestamp)
  }
`;

// CRITICAL: timestamp must be 32-bit seconds, use Math.floor(Date.now() / 1000)
// The API uses 32-bit Int (max value ~2.1 billion), NOT 64-bit milliseconds
