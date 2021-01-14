/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {PantoneColor} from '../../utils/Colors';
import {CustomText} from '../CustomStyledComponent/Text';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default ({nameIcon, text}) => {
  return (
    <View style={styles.container}>
      <FeatherIcon
        style={{color: PantoneColor.livingCoral}}
        name={nameIcon}
        size={30}
      />
      <View style={{marginTop: 5}}>
        <CustomText fontSize={16} color={PantoneColor.livingCoral}>
          {text}
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    borderRadius: 20,
    backgroundColor: PantoneColor.veryLivingCoral,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: 80,
    marginBottom: 10,
  },
});
