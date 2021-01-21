import gql from 'graphql-tag';

export const getMyInfo = gql`
  query {
    getMyInfo {
      avatar
      username
      info {
        firstName
        lastName
      }
    }
  }
`;
