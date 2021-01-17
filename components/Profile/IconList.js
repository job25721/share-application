/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, PantoneColor} from '../../utils/Colors';
import {CustomText} from '../CustomStyledComponent/Text';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default ({nameIcon, text, active, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        active ? {backgroundColor: PantoneColor.veryLivingCoral} : null,
      ]}>
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    borderRadius: 20,
    backgroundColor: 'whitesmoke',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: 80,
    marginBottom: 10,
  },
});
