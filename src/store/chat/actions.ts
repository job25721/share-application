import {MutationFunction} from '@apollo/client';
import {Dispatch} from 'react';
import store, {StoreEvent} from '..';

import {
  SendMessageInput,
  SendMessageReturnType,
} from '../../graphql/mutation/chat';
import {ReuquestMutationReturnType} from '../../graphql/mutation/request';
import {getTime} from '../../utils/getTime';
import {SendMessage} from './types';

export interface UpdateRequestPayload {
  requestId: string;
  itemId?: string;
}

export const SubscribeMessageAction = (
  newDirect: SendMessageInput | undefined,
  updateRequestPayload: UpdateRequestPayload,
  currentUserId: string,
) => async (dispatch: Dispatch<StoreEvent>) => {
  console.log(newDirect);
  if (newDirect && currentUserId === newDirect.to) {
    console.log('show');
    dispatch({
      type: 'ADD_MESSAGE',
      payload: {
        pos: 'left',
        msg: newDirect.message.split('\n'),
        time: getTime(new Date(newDirect.timestamp).getTime()),
      },
    });
    const {itemId, requestId} = updateRequestPayload;
    if (!itemId) {
      dispatch({
        type: 'UPDATE_CHAT_TYPE_ITEM',
        payload: {
          requestId,
          message: {
            ...newDirect,
            timestamp: new Date(newDirect.timestamp),
          },
        },
      });
      dispatch({
        type: 'SORT_REQUEST_ARR_TYPE_ITEM',
      });
    } else {
      dispatch({
        type: 'UPDATE_CHAT_TYPE_PERSON',
        payload: {
          requestId,
          itemId,
          message: {
            ...newDirect,
            timestamp: new Date(newDirect.timestamp),
          },
        },
      });
      dispatch({
        type: 'SORT_REQUEST_ARR_TYPE_PERSON',
      });
    }
    dispatch({type: 'SET_NEW_DIRECT', payload: undefined});
  }
};

export const SendMessageAction = (
  sendMessageMutation: MutationFunction<
    SendMessageReturnType,
    SendMessageInput
  >,
  sendMessagePayload: SendMessage,
  updateRequestPayload: UpdateRequestPayload,
) => async (dispatch: Dispatch<StoreEvent>) => {
  const {chatRoomId, messagePayload} = sendMessagePayload;
  const {from, to, message, timestamp} = messagePayload;

  try {
    const {errors, data} = await sendMessageMutation({
      variables: {
        chatRoomId,
        from,
        to,
        message,
        timestamp,
      },
    });
    if (errors) {
      throw errors;
    }
    if (data) {
      dispatch({
        type: 'ADD_MESSAGE',
        payload: {
          pos: 'right',
          msg: data.sendMessage.message.split('\n'),
          time: getTime(new Date(data.sendMessage.timestamp).getTime()),
        },
      });
      const {itemId, requestId} = updateRequestPayload;
      console.log('sort');

      if (!itemId) {
        dispatch({
          type: 'UPDATE_CHAT_TYPE_ITEM',
          payload: {
            requestId,
            message: messagePayload,
          },
        });
        dispatch({
          type: 'SORT_REQUEST_ARR_TYPE_ITEM',
        });
      } else {
        dispatch({
          type: 'UPDATE_CHAT_TYPE_PERSON',
          payload: {
            requestId,
            itemId,
            message: messagePayload,
          },
        });
        dispatch({
          type: 'SORT_REQUEST_ARR_TYPE_PERSON',
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export const acceptRequestAction = (
  acceptRequestMutation: MutationFunction<ReuquestMutationReturnType>,
) => async (dispatch: Dispatch<StoreEvent>) => {
  const reqId = store.getState().chat.currentProcessRequest?.id;
  if (reqId) {
    try {
      dispatch({type: 'SET_LOADING_ACTION', payload: true});
      const {data, errors} = await acceptRequestMutation({
        variables: {
          reqId,
        },
      });
      if (errors) {
        throw errors;
      }
      if (data?.acceptRequest) {
        dispatch({
          type: 'SET_CURRENT_PROCESS_REQUEST',
          payload: data.acceptRequest,
        });
        dispatch({type: 'SET_LOADING_ACTION', payload: false});
      }
    } catch (err) {
      dispatch({type: 'SET_LOADING_ACTION', payload: false});
      console.log(err);
    }
  }
};

export const acceptDeliveredAction = (
  acceptDeliveredMutation: MutationFunction<ReuquestMutationReturnType>,
) => async (dispatch: Dispatch<StoreEvent>) => {
  const reqId = store.getState().chat.currentProcessRequest?.id;
  if (reqId) {
    try {
      dispatch({type: 'SET_LOADING_ACTION', payload: true});
      const {data, errors} = await acceptDeliveredMutation({
        variables: {
          reqId,
        },
      });
      if (errors) {
        throw errors;
      }
      if (data?.acceptDelivered) {
        dispatch({
          type: 'SET_CURRENT_PROCESS_REQUEST',
          payload: data.acceptDelivered,
        });
        dispatch({type: 'SET_LOADING_ACTION', payload: false});
      }
    } catch (err) {
      dispatch({type: 'SET_LOADING_ACTION', payload: false});
      console.log(err);
    }
  }
};

export const rejectRequestAction = (
  rejectRequestMutation: MutationFunction<ReuquestMutationReturnType>,
) => async (dispatch: Dispatch<StoreEvent>) => {
  const reqId = store.getState().chat.currentProcessRequest?.id;
  if (reqId) {
    try {
      dispatch({type: 'SET_LOADING_ACTION', payload: true});
      const {data, errors} = await rejectRequestMutation({
        variables: {
          reqId,
        },
      });
      if (errors) {
        throw errors;
      }
      if (data?.rejectRequest) {
        dispatch({
          type: 'SET_CURRENT_PROCESS_REQUEST',
          payload: data.rejectRequest,
        });
        dispatch({type: 'SET_LOADING_ACTION', payload: false});
      }
    } catch (err) {
      console.log(err);
      dispatch({type: 'SET_LOADING_ACTION', payload: false});
    }
  }
};
