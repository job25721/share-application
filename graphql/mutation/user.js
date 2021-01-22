import {gql} from '@apollo/client';

export const userLogin = gql`
  mutation Login($username: String!, $password: String!) {
    login(auth: {username: $username, password: $password})
  }
`;
