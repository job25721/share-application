import React from 'react';
import {ItemChatCard} from '../../components/Chat/ChatCard';
import {useNavigation} from '@react-navigation/native';
const ReceivingItemChat = () => {
  const navigation = useNavigation();
  return (
    <>
      <ItemChatCard
        title="กระเป๋า anello"
        owner="Stamp"
        lastestMsg={{from: 'Stamp', msg: 'ผมจะบริจาคให้ 1000 บาท'}}
        imgSrc={require('../../assets/img/bag.jpg')}
        notification={2}
        onPress={() =>
          navigation.navigate('ChatRoom', {name: 'Stamp Watcharin'})
        }
      />
      <ItemChatCard
        title="น้ำยาสรรพรส"
        owner="ปริญญา"
        lastestMsg={{from: 'ปริญญา', msg: 'จ๊วดๆเลยค้าบ'}}
        imgSrc={require('../../assets/img/drink.jpg')}
        notification={1}
        onPress={() =>
          navigation.navigate('ChatRoom', {name: 'ปริญญา สีตะวัน'})
        }
      />
    </>
  );
};

export default ReceivingItemChat;
