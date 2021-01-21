import gql from 'graphql-tag';

export const getMyInfo = gql`
  query {
    getMyInfo {
      avatar
      username
      info {
        firstName
        lastName
        birthDate
        age
      }
    }
  }
`;

export const getMyItem = gql`
  query {
    getMyItem {
      name
      category
      images
      tags
    }
  }
`;
