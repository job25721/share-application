/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {
  StyleSheet,
  View,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import {Button} from '../components/CustomStyledComponent/Button/CustomButton';
import {Colors} from '../utils/Colors';
import {Input} from '../components/CustomStyledComponent/Input/CustomInput';

import {CustomText} from '../components/CustomStyledComponent/Text';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5Pro';
import {DismissKeyboard} from '../components/CustomStyledComponent/DismissKeyboard';

export default (props) => {
  const {
    navigation: {navigate},
  } = props;
  return (
    <DismissKeyboard>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : ''}>
        <SafeAreaView>
          <View
            style={{
              alignItems: 'center',
              // backgroundColor: 'red',
            }}>
            <Image source={require('../assets/img/logo.png')} />
            <CustomText color={Colors._indigo_600} spacing={5} type="header">
              SHARE
            </CustomText>
            <View>
              <CustomText>Email</CustomText>
              <Input focus rounded width={250} />
            </View>
            <View>
              <CustomText>Password</CustomText>
              <Input focus rounded width={250} />
            </View>
            <Button
              text="Login"
              bg={Colors._indigo_500}
              color={Colors.white}
              rounded
              onPress={() => navigate('Tab')}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'flex-end',
              // flex: 1,
              // backgroundColor: 'blue',
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
  icon: {
    // marginHorizontal: 10,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
