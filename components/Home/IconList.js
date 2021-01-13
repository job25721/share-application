/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {PantoneColor} from '../../utils/Colors';
import {CustomText} from '../CustomStyledComponent/Text';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';

export const Icon = ({nameIcon, text}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <View style={styles.container}>
        <AwesomeIcon
          style={{color: PantoneColor.livingCoral}}
          name={nameIcon}
          size={35}
        />
      </View>
      <CustomText fontSize={16} color={PantoneColor.livingCoral}>
        {text}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: 80,
    marginBottom: 10,
  },
});
