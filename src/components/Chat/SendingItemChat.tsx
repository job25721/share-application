import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Image, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootStackParamList} from '../../../App';
import {ItemCardAbstract} from '../../components/Chat/ChatCard';
import {RootState} from '../../store';

import {CustomText} from '../custom-components';

const SendingItemChat: React.FC = () => {
  const myReceiveRequests = useSelector(
    (state: RootState) => state.user.myReceiveRequests,
  );

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <>
      {myReceiveRequests.length > 0 ? (
        myReceiveRequests.map((sending) => (
          <ItemCardAbstract
            key={sending.item.id}
            item={sending.item}
            personRequest={sending.request.length}
            onPress={() =>
              navigation.navigate('Chat', {
                screen: 'Person',
                params: {
                  requests: sending.request,
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
    </>
  );
};
export default SendingItemChat;
