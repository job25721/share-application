import gql from 'graphql-tag';
import {Item} from '../../store/item/types';
import {User} from '../../store/user/types';

export interface MyInfoQueryType {
  getMyInfo: User;
}
export const GET_MY_INFO = gql`
  query {
    getMyInfo {
      id
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

export interface MyItemQueryType {
  getMyItem: Item[];
  getMyReceivedItem: Item[];
}
export const GET_MY_ITEM = gql`
  query {
    getMyItem {
      id
      name
      category
      images
      tags
      owner {
        avatar
        info {
          firstName
          lastName
        }
      }
    }
  }
`;

export const GET_MY_RECEIVED_ITEM = gql`
  query {
    getMyReceivedItem {
      id
      name
      category
      images
      tags
      owner {
        avatar
        info {
          firstName
          lastName
        }
      }
    }
  }
`;
