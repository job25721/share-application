import {DocumentNode} from 'graphql';
import gql from 'graphql-tag';
import {Item} from '../../store/item/types';

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
