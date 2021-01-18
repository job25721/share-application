/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {CustomText} from '../components/CustomStyledComponent/Text';

import {Button} from '../components/CustomStyledComponent/Button/CustomButton';

import {ScrollView} from 'react-native-gesture-handler';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';

export default () => {
  const [pageIndex, setIndex] = useState(0);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          marginVertical: 20,
          marginHorizontal: 50,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Button px={0} onPress={() => setIndex(0)}>
          <CustomText
            fontSize={pageIndex === 0 ? 28 : 22}
            fontWeight={pageIndex === 0 ? 'bold' : 'normal'}>
            Login
          </CustomText>
        </Button>
        <Button px={0} onPress={() => setIndex(1)}>
          <CustomText
            fontSize={pageIndex === 1 ? 28 : 22}
            fontWeight={pageIndex === 1 ? 'bold' : 'normal'}>
            Register
          </CustomText>
        </Button>
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''}>
        <ScrollView>{pageIndex === 0 ? <Login /> : <Register />}</ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
