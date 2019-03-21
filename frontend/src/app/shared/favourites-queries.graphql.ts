import gql from 'graphql-tag';

export const getMonsterFavouritesQuery = gql`
  {
    userFavourites {
      MonsterFavourites {
        id
        name
      }
    }
  }
`;

export const getSpellFavouritesQuery = gql`
  {
    userFavourites {
      SpellFavourites {
        id
        name
      }
    }
  }
`;

export const getFeatFavouritesQuery = gql`
  {
    userFavourites {
      FeatFavourites {
        id
        name
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
