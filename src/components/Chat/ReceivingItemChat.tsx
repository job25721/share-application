import React from 'react';

import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {ItemChatCard} from './ChatCard';

import {CustomText} from '../custom-components';
import {View} from 'react-native';

const ReceivingItemChat = () => {
  const mySendRequestsState = useSelector(
    (state: RootState) => state.user.mySendRequests,
  );

  if (mySendRequestsState.length === 0) {
    return (
      <View>
        <CustomText>ไม่มีของที่คุณขอรับ ลองหาของที่คุณอยากได้สิ!</CustomText>
      </View>
    );
  }

  return (
    <>
      {mySendRequestsState.map((request) => (
        <ItemChatCard
          key={request.id}
          request={request}
          latestMsg={{from: 'ระบบ', msg: 'สร้างห้องแชทเรียบร้อยแล้ว'}}
          notification={1}
          type="Item"
        />
      ))}
    </>
  );
};

export default ReceivingItemChat;
