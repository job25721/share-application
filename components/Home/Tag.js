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
    width: 80,
    borderColor: Colors._indigo_300,
    borderWidth: 1,

    backgroundColor: Colors.white,
    borderRadius: 30,
    padding: 5,
    marginHorizontal: 1,
    marginVertical: 3,
  },
});
