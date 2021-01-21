import gql from 'graphql-tag';

export const getAllItem = gql`
  query {
    getAllItem {
      id
      owner {
        avatar
        info {
          firstName
          lastName
        }
      }
      tags
      category
      images
    }
  }
`;
