import gql from 'graphql-tag';

export const getAllItem = gql`
  query {
    getAllItem {
      name
      owner {
        info {
          firstName
          lastName
        }
      }
      tags
      category
    }
  }
`;
