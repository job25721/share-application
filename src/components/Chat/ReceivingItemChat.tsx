/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {ItemChatCard} from './ChatCard';

import {CustomText} from '../custom-components';
import {View} from 'react-native';

const ReceivingItemChat = () => {
  const {mySendRequests} = useSelector((state: RootState) => state.request);
  const currentUser = useSelector((state: RootState) => state.user.userData);

  if (mySendRequests.length === 0) {
    return (
      <View>
        <CustomText>ไม่มีของที่คุณขอรับ ลองหาของที่คุณอยากได้สิ!</CustomText>
      </View>
    );
  }

  return (
    <View style={{padding: 5}}>
      {mySendRequests.map((request) => (
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
