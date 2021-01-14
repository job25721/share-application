import React from 'react';
import {PersonChatCard} from '../../components/Chat/ChatCard';
import {useNavigation} from '@react-navigation/native';

const SendingItemChat = () => {
  const navigation = useNavigation();
  return (
    <>
      <PersonChatCard
        name="Pathomporn Pankaew"
        onPress={() =>
          navigation.navigate('PersonModal', {user: 'Pathomporn Pankaew'})
        }
      />
      <PersonChatCard
        name="แสตมป์ ขุนแผน"
        onPress={() =>
          navigation.navigate('PersonModal', {user: 'แสตมปื ขุนแผน'})
        }
      />
    </>
  );
};
export default SendingItemChat;
