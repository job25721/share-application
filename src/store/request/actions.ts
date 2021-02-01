import {MutationFunction} from '@apollo/client';
import {StackNavigationProp} from '@react-navigation/stack';
import {Dispatch} from 'react';
import store, {StoreEvent} from '..';
import {RootStackParamList} from '../../../App';
import {
  ReuquestMutationReturnType,
  SendRequestDto,
} from '../../graphql/mutation/request';

export const createRequestAction = (
  createRequestMutation: MutationFunction<ReuquestMutationReturnType>,
  navigation: StackNavigationProp<RootStackParamList, 'Detail'>,
) => async (dispatch: Dispatch<StoreEvent>) => {
  const {requestItemId, reason, wantedRate} = store.getState().request;

  if (requestItemId !== '' && reason !== '') {
    const sendRequestData: SendRequestDto = {
      itemId: requestItemId,
      reason,
      wantedRate,
    };

    try {
      dispatch({
        type: 'SET_REQUEST_LOADING',
        payload: {msg: 'กรุณารอสักครู่ กำลังส่งคำขอ...', loading: true},
      });
      const {data, errors} = await createRequestMutation({
        variables: sendRequestData,
      });
      if (errors) {
        throw errors;
      }
      if (data) {
        dispatch({type: 'ADD_MY_SEND_REQUETS', payload: data.createRequest});
        dispatch({type: 'CLEAR_REQUEST_DATA'});
        dispatch({
          type: 'SET_REQUEST_LOADING',
          payload: {msg: '', loading: false},
        });
        dispatch({type: 'SET_TAB_INDEX', payload: 0});
        navigation.navigate('Chat', {screen: 'Index'});
      }
    } catch (err) {
      dispatch({
        type: 'SET_REQUEST_LOADING',
        payload: {msg: `มีข้อผิดพลาด\n${err.message}`, loading: true},
      });
      console.log(err);
    }
  } else {
    console.log('missing value');
  }
};
