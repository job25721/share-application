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

export const GET_MY_RECEIVING_ITEM = gql`
  query {
    getMySendRequests {
      id
      item {
        name
        status
        images
        owner {
          id
          info {
            firstName
            lastName
          }
          avatar
        }
      }
    }
  }
`;
