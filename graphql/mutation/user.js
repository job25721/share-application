import gql from 'graphql-tag';

export const userLogin = gql`
  mutation Login($username: String!, $password: String!) {
    login(auth: {username: $username, password: $password})
  }
`;
