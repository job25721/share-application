import React, {useContext, useEffect} from 'react';
// import {ItemChatCard} from '../../components/Chat/ChatCard';
import {useNavigation} from '@react-navigation/native';

import {StackNavigationProp} from '@react-navigation/stack';
import {ChatStackParamList, RefreshContext} from '../../../App';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {ItemChatCard} from './ChatCard';

import {CustomText} from '../custom-components';
import {View} from 'react-native';

const ReceivingItemChat = () => {
  //   const navigation = useNavigation<StackNavigationProp<ChatStackParamList>>();
  const {mySendRequests} = useContext(RefreshContext);
  const {refreshing} = mySendRequests;
  const mySendRequestsState = useSelector(
    (state: RootState) => state.user.mySendRequests,
  );

  if (refreshing) {
    return (
      <View>
        <CustomText type="subheader">Loading...</CustomText>
      </View>
    );
  }

  return (
    <>
      {mySendRequestsState.length > 0 ? (
        mySendRequestsState.map((request) => (
          <ItemChatCard
            key={request.id}
            title={request.item.name}
            owner={request.requestToPerson}
            latestMsg={{from: 'ระบบ', msg: 'สร้างห้องแชทเรียบร้อยแล้ว'}}
            imgSrc={request.item.images[0]}
            notification={1}
            type="Item"
            //   onPress={() =>
            //     navigation.navigate('ChatRoom', {
            //      chatWith : ,
            //     })
            //   }
          />
        ))
      ) : (
        <View>
          <CustomText>ไม่มีของที่คุณขอรับ ลองหาของที่คุณอยากได้สิ!</CustomText>
        </View>
      )}
    </>
  );
};

export default ReceivingItemChat;
