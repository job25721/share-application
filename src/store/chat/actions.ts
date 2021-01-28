import {MutationFunction} from '@apollo/client';
import {Dispatch} from 'react';
import store, {StoreEvent} from '..';
import {ReuquestMutationReturnType} from '../../graphql/mutation/request';

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
