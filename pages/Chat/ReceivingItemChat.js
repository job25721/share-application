import React from 'react';
import {ItemChatCard} from '../../components/Chat/ChatCard';
import {useNavigation} from '@react-navigation/native';
const ReceivingItemChat = () => {
  const navigation = useNavigation();
  return (
    <>
      <ItemChatCard
        title="กระเป๋า anello (เจ้าของ Stamp)"
        imgSrc={require('../../assets/img/bag.jpg')}
        notification={2}
        onPress={() =>
          navigation.navigate('ChatRoom', {name: 'Stamp Watcharin'})
        }
      />
    </>
  );
};

export default ReceivingItemChat;
