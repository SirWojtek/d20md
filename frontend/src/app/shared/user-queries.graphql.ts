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
