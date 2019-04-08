import gql from 'graphql-tag';

export const getFeatQuery = gql`
  query basic($id: Int!, $userId: Int) {
    feat(id: $id, userId: $userId) {
      id
      name
      feat_type
      benefit
      normal
      special
      isInFavourites
      favouritesCount
      Prerequisite {
        id
        name
        benefit
      }
      Monsters {
        id
        name
      }
      User {
        id
      }
    }
  }
`;

export const findFeatsQuery = gql`
  query findFeats(
    $name: String
    $phrase: String
    $feat_type: String
    $limit: Int!
    $offset: Int!
    $userId: Int
  ) {
    feats(
      name: $name
      phrase: $phrase
      feat_type: $feat_type
      limit: $limit
      offset: $offset
      userId: $userId
    ) {
      count
      feats {
        id
        name
        feat_type
        benefit
        special
        normal
        isInFavourites
      }
    }
  }
`;
