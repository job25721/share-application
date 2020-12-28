import React from 'react';
import {SafeAreaView, View, Image, StyleSheet} from 'react-native';
import {Colors} from '../components/CustomStyledComponent/Colors';
import AppABar from '../components/Appbar';
import {DismissKeyboard} from '../components/DismissKeyboard';
export default (props) => {
  return (
    <DismissKeyboard>
      <AppABar navigate={props.navigation.navigate}>
        <View style={styles.socialLogin}>
          <Image source={require('../assets/img/logo2.png')} />
        </View>
      </AppABar>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  socialLogin: {
    flexDirection: 'row',
  },
  icon: {
    // marginHorizontal: 10,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});
