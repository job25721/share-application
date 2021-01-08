/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from '../../utils/Colors';
import {Button} from '../CustomStyledComponent/Button/CustomButton';
import {CustomText} from '../CustomStyledComponent/Text';
import FeatherIcon from 'react-native-vector-icons/Feather';
const CameraBtn = ({onPress}) => {
  return (
    <Button onPress={onPress} rounded bg={Colors._gray_900} py={20} px={10}>
      <View style={btnStyles.btnFlex}>
        <FeatherIcon name="camera" size={45} />
        <CustomText fontSize={16} fontWeight="bold">
          Open camera
        </CustomText>
      </View>
    </Button>
  );
};

const btnStyles = StyleSheet.create({
  btnFlex: {
    alignItems: 'center',
  },
});

export default CameraBtn;
