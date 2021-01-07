/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '../../utils/Colors';
import {CustomText} from '../CustomStyledComponent/Text';

export default () => {
  return (
    <View style={{flexDirection: 'row', marginVertical: 10}}>
      <View style={styles.container} />
      <View style={{justifyContent: 'center'}}>
        <CustomText fontSize={22} fontWeight="bold">
          หนังสือแคล 3
        </CustomText>
        <CustomText fontSize={16}>
          แท็ก: หนังสือ อุปกรณ์การเรียน วิศวะ
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    backgroundColor: Colors._indigo_300,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 5,
  },
});
