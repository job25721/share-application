import {gql} from '@apollo/client';

export const USER_LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(auth: {username: $username, password: $password})
  }
`;
