import { gql } from '@apollo/client';

export const ADD_NOTE = gql`
  mutation AddNote($birdId: ID!, $comment: String!, $timestamp: Int!) {
    addNote(birdId: $birdId, comment: $comment, timestamp: $timestamp)
  }
`;
