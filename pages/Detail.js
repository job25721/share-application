import React from 'react';
import AppABar from '../components/Appbar';
import {CustomText} from '../components/CustomStyledComponent/Text';
import {View} from 'react-native';

export default (props) => {
  return (
    <AppABar navigate={props.navigation.navigate}>
      <View>
        <CustomText>Hello</CustomText>
      </View>
    </AppABar>
  );
};
