/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';

import {
  StyleSheet,
  View,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import {Button} from '../CustomStyledComponent/Button/CustomButton';
import {Colors, PantoneColor} from '../../utils/Colors';
import {Input} from '../CustomStyledComponent/Input/CustomInput';

import {CustomText} from '../CustomStyledComponent/Text';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5Pro';
import {DismissKeyboard} from '../CustomStyledComponent/DismissKeyboard';
import {useNavigation} from '@react-navigation/native';

export default () => {
  const {navigate} = useNavigation();

  return (
    <>
      <View
        style={{
          alignItems: 'center',
        }}>
        <Image
          style={{height: 100, width: 100, borderRadius: 50}}
          source={require('../../assets/img/realLogo.png')}
        />
        <CustomText spacing={10} color={PantoneColor.livingCoral} type="header">
          SHARE
        </CustomText>
      </View>
      <View
        style={{marginVertical: 0, paddingHorizontal: 50, paddingVertical: 25}}>
        {/* <CustomText textAlign="center">Email</CustomText> */}
        <Input placeholder="Username" focus rounded width="100%" />
        {/* <CustomText>Password</CustomText> */}
        <Input placeholder="Password" focus rounded width="100%" />
        <Button
          text="Login"
          bg={PantoneColor.turkishSea}
          color={Colors.white}
          rounded
          my={10}
          onPress={() => navigate('Tab')}
        />
      </View>

      <View
        style={{
          alignItems: 'center',
        }}>
        {/* <Button text="Create new Account" color={Colors._indigo_500} /> */}
        <CustomText color="#b5b5b5" fontSize={15}>
          Or Continute With
        </CustomText>
        <View style={styles.socialLogin}>
          <Button
            text={
              <FontAwesomeIcon
                style={[styles.icon, {color: Colors.facebook}]}
                name="facebook"
                size={30}
              />
            }
            px={0}
            mx={10}
            onPress={() => Alert.alert('Facebook')}
          />
          <Button
            text={
              <FontAwesomeIcon
                style={[styles.icon, {color: Colors.google}]}
                name="google"
                size={30}
              />
            }
            px={0}
            mx={10}
            onPress={() => Alert.alert('Google')}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  socialLogin: {
    flexDirection: 'row',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
