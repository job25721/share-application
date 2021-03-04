/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent} from 'react';

import {View} from 'react-native';
import {CustomText} from '.';
import {Colors} from '../../utils/Colors';

interface Props {
  noti?: number;
  width?: number;
  height?: number;
}

export const Badge: FunctionComponent<Props> = ({
  noti,
  width = 20,
  height = 20,
}) => (
  <View
    style={{
      width,
      height,
      backgroundColor: Colors._red_500,
      borderRadius: 50,
      position: 'absolute',
      zIndex: 1,
      right: -5,
      top: -10,
      justifyContent: 'center',
    }}>
    {noti && (
      <CustomText
        textAlign="center"
        color={Colors.white}
        fontWeight="700"
        fontSize={14}>
        {noti}
      </CustomText>
    )}
  </View>
);
