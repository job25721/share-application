/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, KeyboardAvoidingView, Platform} from 'react-native';

import {ScrollView} from 'react-native-gesture-handler';
import Login from '../components/Auth/Login';

export default () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''}>
        <ScrollView>
          <Login />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
