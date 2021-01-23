import {gql} from '@apollo/client';

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
      item {
        name
        owner {
          id
          info {
            firstName
            lastName
          }
        }
      }
    }
  }
`;
