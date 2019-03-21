import gql from 'graphql-tag';

export const getMonsterFavouritesQuery = gql`
  query getMonsterFavourites($offset: Int!, $limit: Int!) {
    userFavourites(offset: $offset, limit: $limit) {
      MonsterFavourites {
        id
        name
      }
    }
  }
`;

export const getSpellFavouritesQuery = gql`
  query getSpellFavourites($offset: Int!, $limit: Int!) {
    userFavourites(offset: $offset, limit: $limit) {
      SpellFavourites {
        id
        name
      }
    }
  }
`;

export const getFeatFavouritesQuery = gql`
  query getFeatFavourites($offset: Int!, $limit: Int!) {
    userFavourites(offset: $offset, limit: $limit) {
      userFavourites {
        FeatFavourites {
          id
          name
        }
      }
    }
  }
`;

export const addMonsterToFavouritesMutation = gql`
  mutation addMonsterToFavouritesMutation($id: ID!) {
    addMonsterToFavourites(id: $id)
  }
`;

export const addSpellToFavouritesMutation = gql`
  mutation addSpellToFavouritesMutation($id: ID!) {
    addSpellToFavourites(id: $id)
  }
`;

export const addFeatToFavouritesMutation = gql`
  mutation addFeatToFavouritesMutation($id: ID!) {
    addFeatToFavourites(id: $id)
  }
`;

export const removeMonsterFromFavouritesMutation = gql`
  mutation removeMonsterFromFavouritesMutation($id: ID!) {
    removeMonsterFromFavourites(id: $id)
  }
`;

export const removeSpellFromFavouritesMutation = gql`
  mutation removeSpellFromFavouritesMutation($id: ID!) {
    removeSpellFromFavourites(id: $id)
  }
`;

export const removeFeatFromFavouritesMutation = gql`
  mutation removeFeatFromFavouritesMutation($id: ID!) {
    removeFeatFromFavourites(id: $id)
  }
`;
