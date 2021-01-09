/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import NavigationBar from '../../components/CustomStyledComponent/NavigationBar';
import {ItemChatCard, PersonChatCard} from '../../components/Chat/ChatCard';

const ChatIndex = (props) => {
  const {navigation} = props;
  return (
    <ScrollView style={styles.container}>
      <PersonChatCard
        onPress={() =>
          navigation.navigate('PersonModal', {user: 'Pathomporn Pankaew'})
        }
      />
      <ItemChatCard
        title="กระเป๋า anello (เจ้าของ Stamp)"
        imgSrc={require('../../assets/img/bag.jpg')}
        notification={2}
        onPress={() =>
          navigation.navigate('ChatRoom', {name: 'Stamp Watcharin'})
        }
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
});

export default ChatIndex;
