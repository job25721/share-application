/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootStackParamList} from '../../../App';
import {ItemCardAbstract} from '../../components/Chat/ChatCard';
import {RootState} from '../../store';

import {CustomText} from '../custom-components';

const SendingItemChat: React.FC = () => {
  const myReceiveRequests = useSelector(
    (state: RootState) => state.request.myReceiveRequests,
  );

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
