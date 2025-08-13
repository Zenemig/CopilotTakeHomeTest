import { gql } from '@apollo/client';

export const GET_BIRDS = gql`
  query GetBirds {
    birds {
      id
      thumb_url
      english_name
      latin_name
    }
  }
`;

export const GET_BIRD = gql`
  query GetBird($id: ID!) {
    bird(id: $id) {
      id
      thumb_url
      image_url
      english_name
      latin_name
      notes {
        id
        comment
        timestamp
      }
    }
  }
`;
