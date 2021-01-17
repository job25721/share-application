/* eslint-disable no-unused-vars */
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import List from '../components/Noti/ImageList';

export default () => {
  return (
    <ScrollView>
      {[1, 2, 3, 4, 5, 6, 7].map((item) => (
        <List key={item} />
      ))}
    </ScrollView>
  );
};
