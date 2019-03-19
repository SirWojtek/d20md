import gql from 'graphql-tag';

export const resetPasswordMutation = gql`
  mutation resetPasswordMutation($email: String!) {
    resetPassword(email: $email)
  }
`;

export const changePasswordWithCodeMutation = gql`
  mutation changePasswordWithCodeMutation(
    $code: String!
    $newPassword: String!
  ) {
    changePassword(code: $code, newPassword: $newPassword)
  }
`;

export const changePasswordMutation = gql`
  mutation changePasswordMutation($newPassword: String!) {
    changePassword(newPassword: $newPassword)
  }
`;

export const addMonsterToFavouritesMutation = gql`
  mutation addMonsterToFavouritesMutation($id: Id!) {
    addMonsterToFavourites(id: $id)
  }
`;

export const addSpellToFavouritesMutation = gql`
  mutation addSpellToFavouritesMutation($id: Id!) {
    addSpellToFavourites(id: $id)
  }
`;

export const addFeatToFavouritesMutation = gql`
  mutation addFeatToFavouritesMutation($id: Id!) {
    addFeatToFavourites(id: $id)
  }
`;

export const removeMonsterFromFavouritesMutation = gql`
  mutation removeMonsterFromFavouritesMutation($id: Id!) {
    removeMonsterFromFavourites(id: $id)
  }
`;

export const removeSpellFromFavouritesMutation = gql`
  mutation removeSpellFromFavouritesMutation($id: Id!) {
    removeSpellFromFavourites(id: $id)
  }
`;

export const removeFeatFromFavouritesMutation = gql`
  mutation removeFeatFromFavouritesMutation($id: Id!) {
    removeFeatFromFavourites(id: $id)
  }
`;
