import {gql} from '@apollo/client';

export const NEW_REQUEST = gql`
  subscription {
    newRequest {
      id
      requestPerson {
        id
        avatar
        info {
          firstName
          lastName
        }
      }
      reason
      wantedRate
      status
      item {
        id
        name
        category
        description
        tags
        status
        images
        owner {
          id
          avatar
          info {
            firstName
            lastName
          }
        }
        acceptedToPerson {
          id
          avatar
          info {
            firstName
            lastName
          }
        }
      }
      chat {
        id
        data {
          from
          to
          message
          timestamp
          hasReaded
        }
        active
        lastestUpdate
      }
    }
  }
`;
