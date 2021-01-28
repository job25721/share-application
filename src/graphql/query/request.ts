import {gql, DocumentNode} from '@apollo/client';
import {Request} from '../../store/request/types';
export interface GetRequestsQueryType {
  getMySendRequests?: Request[];
  getMyRequests?: Request[];
}
export const GET_MY_RECEIVING_ITEM: DocumentNode = gql`
  query {
    getMySendRequests {
      id
      requestToPerson {
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
      }
      chat {
        id
        data {
          from
          to
          message
          timestamp
        }
        active
      }
    }
  }
`;

export const GET_MY_REQUESTS = gql`
  query {
    getMyRequests {
      id
      requestToPerson {
        id
        avatar
        info {
          firstName
          lastName
        }
      }
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
      }
      chat {
        id
        data {
          from
          to
          message
          timestamp
        }
        active
      }
    }
  }
`;
