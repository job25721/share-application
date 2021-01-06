import React from 'react';
import {FlatList, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import NavigationBar from '../../components/CustomStyledComponent/NavigationBar';

const ChatIndex = (props) => {
  const {
    navigation: {navigate},
  } = props;
  return (
    <NavigationBar navigate={navigate}>
      <ScrollView></ScrollView>
    </NavigationBar>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ChatIndex;
