import React from 'react';
import {ItemCardAbstract} from '../../components/Chat/ChatCard';
import {useNavigation} from '@react-navigation/native';

const SendingItemChat = () => {
  const navigation = useNavigation();
  return (
    <>
      <ItemCardAbstract
        title="แมว พันธ์ ไซบีเรียน ฮักนะ"
        imgSrc={require('../../assets/img/cat.jpg')}
        notification={5}
        onPress={() =>
          navigation.navigate('PersonModal', {
            itemName: 'แมว พันธ์ ไซบีเรียน ฮักนะ',
          })
        }
      />
      <ItemCardAbstract
        title="กระเป๋าก๊อปแท้จีนแดง"
        imgSrc={require('../../assets/img/bag.jpg')}
        notification={5}
        onPress={() =>
          navigation.navigate('PersonModal', {
            itemName: 'กระเป๋าก๊อปแท้จีนแดง',
          })
        }
      />
    </>
  );
};
export default SendingItemChat;
