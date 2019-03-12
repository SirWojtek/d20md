import gql from 'graphql-tag';

export const quickSearchQuery = gql`
  query quickSearch($query: String!) {
    monsters(name: $query, limit: 10, offset: 0) {
      monsters {
        id
        name
      }
    }
    spells(name: $query, limit: 10, offset: 0) {
      spells {
        id
        name
      }
    }
    feats(name: $query, limit: 10, offset: 0) {
      feats {
        id
        name
      }
    }
  }
`;
