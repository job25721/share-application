import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootStackParamList} from '../../../App';
import {ItemCardAbstract} from '../../components/Chat/ChatCard';

import {RootState} from '../../store';

import {CustomText} from '../custom-components';

const SendingItemChat: React.FC<{loading: boolean}> = ({loading}) => {
  const {myReceiveRequests} = useSelector((state: RootState) => state.request);
  const {userData} = useSelector((state: RootState) => state.user);

  const {navigate} = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{padding: 5}}>
      {myReceiveRequests.length > 0 ? (
        myReceiveRequests.map((sending) => (
          <ItemCardAbstract
            loading={loading}
            key={sending.item.id}
            item={sending.item}
            personRequest={sending.request.length}
            notification={sending.request
              .map(
                ({chat}) =>
                  chat.data.filter(
                    ({hasReaded, to}) =>
                      hasReaded === false && to === userData?.id,
                  ).length,
              )
              .reduce((cur, acc) => cur + acc)}
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
