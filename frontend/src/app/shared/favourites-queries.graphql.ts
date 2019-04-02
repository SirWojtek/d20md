import gql from 'graphql-tag';

export const getMonsterFavouritesQuery = gql`
  query getMonsterFavourites($offset: Int!, $limit: Int!) {
    monsterFavourites(offset: $offset, limit: $limit) {
      count
      monsters {
        id
        name
        type
        isInFavourites
        HitDices {
          hd_type
          hd_amount
        }
        Save {
          will
          reflex
          fortitude
        }
      }
    }
  }
`;

export const getSpellFavouritesQuery = gql`
  query getSpellFavourites($offset: Int!, $limit: Int!) {
    spellFavourites(offset: $offset, limit: $limit) {
      count
      spells {
        id
        name
        spell_type
      }
    }
  }
`;

export const getFeatFavouritesQuery = gql`
  query getFeatFavourites($offset: Int!, $limit: Int!) {
    featFavourites(offset: $offset, limit: $limit) {
      count
      feats {
        id
        name
      }
    }
  }
`;

export const getFavouritesCountQuery = gql`
  {
    monsterFavourites(offset: 0, limit: 0) {
      count
    }
    spellFavourites(offset: 0, limit: 0) {
      count
    }
    featFavourites(offset: 0, limit: 0) {
      count
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
