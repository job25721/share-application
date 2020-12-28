import React from 'react';
import AppABar from '../components/Appbar';
import {CustomText} from '../components/CustomStyledComponent/Text';
import {View} from 'react-native';

export default () => {
  return (
    <AppABar>
      <View>
        <CustomText>Hello</CustomText>
      </View>
    </AppABar>
  );
};
