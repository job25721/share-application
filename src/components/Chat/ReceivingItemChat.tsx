/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';

import {useSelector} from 'react-redux';
import {RootState, useDispatch} from '../../store';
import {ItemChatCard} from './ChatCard';

import {CustomText} from '../custom-components';
import {View} from 'react-native';
import {SubscribeMessageAction} from '../../store/chat/actions';

const ReceivingItemChat = () => {
  const dispatch = useDispatch();
  const mySendRequestsState = useSelector(
    (state: RootState) => state.request.mySendRequests,
  );

  const {newDirectMessage} = useSelector((state: RootState) => state.chat);
  const currentUser = useSelector((state: RootState) => state.user.userData);
  useEffect(() => {
    if (newDirectMessage) {
      SubscribeMessageAction(
        newDirectMessage,
        {
          requestId: newDirectMessage.requestId,
          itemId: undefined,
        },
        currentUser ? currentUser.id : '',
      )(dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newDirectMessage]);

  if (mySendRequestsState.length === 0) {
    return (
      <View>
        <CustomText>ไม่มีของที่คุณขอรับ ลองหาของที่คุณอยากได้สิ!</CustomText>
      </View>
    );
  }

  return (
    <View style={{padding: 5}}>
      {mySendRequestsState.map((request) => (
        <ItemChatCard
          key={request.id}
          request={request}
          latestMsg={{
            from:
              request.chat.data.length > 0
                ? request.chat.data[request.chat.data.length - 1].from
                : '',
            msg:
              request.chat.data.length > 0
                ? request.chat.data[request.chat.data.length - 1].message
                : '',
          }}
          notification={
            request.chat.data.filter(
              ({hasReaded, to}) =>
                hasReaded === false && currentUser?.id === to,
            ).length
          }
          type="Item"
        />
      ))}
    </View>
  );
};

export default ReceivingItemChat;
