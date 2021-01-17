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
import {Button} from '../components/CustomStyledComponent/Button/CustomButton';
import {Colors, PantoneColor} from '../utils/Colors';
import {Input} from '../components/CustomStyledComponent/Input/CustomInput';

import {CustomText} from '../components/CustomStyledComponent/Text';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5Pro';
import {DismissKeyboard} from '../components/CustomStyledComponent/DismissKeyboard';

export default (props) => {
  const {
    navigation: {navigate},
  } = props;
  const [keyBoardShow, setShow] = useState(false);
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', onKeyboardShow);
    Keyboard.addListener('keyboardDidHide', onKeyboardHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', onKeyboardShow);
      Keyboard.removeListener('keyboardDidHide', onKeyboardHide);
    };
  }, []);

  const onKeyboardShow = () => setShow(true);

  const onKeyboardHide = () => setShow(false);
  return (
    <DismissKeyboard>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : ''}>
        <SafeAreaView
          style={
            !keyBoardShow ? {flex: 1, justifyContent: 'space-evenly'} : null
          }>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              top: -40,
            }}>
            <CustomText fontSize={22}>Login</CustomText>
            <CustomText fontSize={22}>Register</CustomText>
          </View>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Image
              style={{height: 100, width: 100, borderRadius: 50}}
              source={require('../assets/img/realLogo.png')}
            />
            <CustomText
              spacing={10}
              color={PantoneColor.livingCoral}
              type="header">
              SHARE
            </CustomText>
          </View>
          <View style={{marginVertical: 0}}>
            <CustomText>Email</CustomText>
            <Input focus rounded width={250} />
            <CustomText>Password</CustomText>
            <Input focus rounded width={250} />
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
              justifyContent: 'flex-end',
            }}>
            <Button text="Create new Account" color={Colors._indigo_500} />
            <CustomText color="#b5b5b5" fontSize={15}>
              Or Continue With
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
        </SafeAreaView>
      </KeyboardAvoidingView>
    </DismissKeyboard>
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
