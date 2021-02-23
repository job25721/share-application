/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {ItemChatCard} from './ChatCard';

import {CustomText} from '../custom-components';
import {View} from 'react-native';

const ReceivingItemChat = () => {
  const mySendRequestsState = useSelector(
    (state: RootState) => state.request.mySendRequests,
  );

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
          notification={10}
          type="Item"
        />
      ))}
    </View>
  );
};

export default ReceivingItemChat;
