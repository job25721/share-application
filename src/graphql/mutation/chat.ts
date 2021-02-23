import {gql} from '@apollo/client';

export interface SendMessageInput {
  chatRoomId: string;
  from: string;
  to: string;
  message: string;
  timestamp: Date;
}
export interface SendMessageReturnType {
  sendMessage: SendMessageInput;
}
export const SEND_MESSAGE = gql`
  mutation SendMessage(
    $chatRoomId: String!
    $from: String!
    $to: String!
    $message: String!
    $timestamp: DateTime!
  ) {
    sendMessage(
      chatRoomId: $chatRoomId
      messagePayload: {
        message: $message
        from: $from
        to: $to
        timestamp: $timestamp
      }
    ) {
      message
      from
      to
      timestamp
    }
  }
`;
