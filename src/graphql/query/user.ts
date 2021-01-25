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
}
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
