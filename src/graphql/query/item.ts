import {DocumentNode} from 'graphql';
import gql from 'graphql-tag';
import {Item} from '../../store/item/types';
import {Request} from '../../store/request/types';
export interface GetAllItemQueryType {
  getAllItem: Item[];
}
export const GET_ALL_ITEM: DocumentNode = gql`
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

export interface GetMyRceivingItemQueryType {
  getMySendRequests: Request;
}
export const GET_MY_RECEIVING_ITEM: DocumentNode = gql`
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
