import {gql} from '@apollo/client';
import {Request} from '../../store/request/types';

export interface CreateReuquestReturnType {
  createRequest: Request;
}
export interface SendRequestDto {
  itemId: string;
  reason: string;
  wantedRate: number;
}
export const CREATE_REQUEST = gql`
  mutation CreateRequest(
    $reason: String!
    $wantedRate: Float!
    $itemId: String!
  ) {
    createRequest(
      reqData: {reason: $reason, wantedRate: $wantedRate, itemId: $itemId}
    ) {
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
