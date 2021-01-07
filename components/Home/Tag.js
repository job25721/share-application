import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {Colors} from '../../utils/Colors';
import {CustomText} from '../CustomStyledComponent/Text';

export default ({text, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.tag}>
      <CustomText textAlign="center" fontSize={13}>
        {text}
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tag: {
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    width: 80,
    shadowColor: Colors._indigo_400,
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 3,
    marginHorizontal: 1,
    marginVertical: 3,
  },
});
