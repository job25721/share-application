import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {Colors, PantoneColor} from '../../utils/Colors';
import {CustomText} from '../CustomStyledComponent/Text';

export default ({text, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.tag}>
      <CustomText
        textAlign="center"
        fontSize={13}
        color={PantoneColor.livingCoral}>
        {text}
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tag: {
    width: 80,
    shadowColor: Colors.black,
    backgroundColor: PantoneColor.veryLivingCoral,
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 3,
    marginHorizontal: 1,
    marginVertical: 3,
    justifyContent: 'center',
  },
});
