/* eslint-disable react-native/no-inline-styles */

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootStackParamList} from '../../../App';
import {ItemCardAbstract} from '../../components/Chat/ChatCard';

import {RootState, useDispatch} from '../../store';
import {SubscribeMessageAction} from '../../store/chat/actions';

import {CustomText} from '../custom-components';

const SendingItemChat: React.FC = () => {
  const dispatch = useDispatch();
  const myReceiveRequests = useSelector(
    (state: RootState) => state.request.myReceiveRequests,
  );

  const {newDirectMessage} = useSelector((state: RootState) => state.chat);
  const currentUser = useSelector((state: RootState) => state.user.userData);

  useEffect(() => {
    if (newDirectMessage) {
      SubscribeMessageAction(
        newDirectMessage,
        {
          requestId: newDirectMessage.requestId,
          itemId: newDirectMessage.itemId,
        },
        currentUser ? currentUser.id : '',
      )(dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newDirectMessage]);

  const {navigate} = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={{padding: 5}}>
      {myReceiveRequests.length > 0 ? (
        myReceiveRequests.map((sending) => (
          <ItemCardAbstract
            key={sending.item.id}
            item={sending.item}
            personRequest={sending.request.length}
            onPress={() =>
              navigate('Chat', {
                screen: 'Person',
                params: {
                  itemId: sending.item.id,
                  itemName: sending.item.name,
                },
              })
            }
          />
        ))
      ) : (
        <View>
          <CustomText>ไม่มีคนที่ขอรับของคุณตอนนี้</CustomText>
        </View>
      )}
    </View>
  );
};
export default SendingItemChat;
