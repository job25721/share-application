import gql from 'graphql-tag';

export const getAllItem = gql`
  query {
    getAllItem {
      id
      name
      owner {
        id
        avatar
        info {
          firstName
          lastName
        }
      }
      tags
      category
      description
      images
      status
    }
  }
`;
