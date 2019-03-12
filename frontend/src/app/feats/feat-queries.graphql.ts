import gql from 'graphql-tag';

export const getQueryMap = {
  basic: gql`
    query basic($id: Int!, $userId: Int) {
      feat(id: $id, userId: $userId) {
        id
        name
        feat_type
        benefit
        normal
        special
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
  `,
};

export const findFeatsQuery = gql`
  query findFeats(
    $name: String
    $phrase: String
    $feat_type: String
    $limit: Int!
    $offset: Int!
  ) {
    feats(
      name: $name
      phrase: $phrase
      feat_type: $feat_type
      limit: $limit
      offset: $offset
    ) {
      count
      feats {
        id
        name
        feat_type
        benefit
        special
        normal
      }
    }
  }
`;
