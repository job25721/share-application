import React from 'react';
import AppABar from '../components/Appbar';
import {CustomText} from '../components/CustomStyledComponent/Text';
import {View, Image, StyleSheet} from 'react-native';

export default (props) => {
  return (
    <AppABar navigate={props.navigation.navigate}>
      <View>
        <Image
          style={style.setImage}
          source={require('../assets/img/upload.png')}
        />
      </View>
    </AppABar>
  );
};

const style = StyleSheet.create({
  setImage: {
    height: 200,
  },
});
