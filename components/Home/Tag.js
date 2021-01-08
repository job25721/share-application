import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {Colors} from '../../utils/Colors';
import {CustomText} from '../CustomStyledComponent/Text';

export default ({text, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.tag}>
      <CustomText textAlign="center" fontSize={12} color={Colors._indigo_700}>
        {text}
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tag: {
    width: 80,
    shadowColor: Colors._indigo_400,
    backgroundColor: Colors._indigo_100,
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 3,
    marginHorizontal: 1,
    marginVertical: 3,
  },
});
