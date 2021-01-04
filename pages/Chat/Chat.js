import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import ChatForm from '../../components/Chat/ChatForm';
import {Button} from '../../components/CustomStyledComponent/Button/CustomButton';
import {Colors} from '../../components/CustomStyledComponent/Colors';
import {Input} from '../../components/CustomStyledComponent/Input/CustomInput';
import {CustomText} from '../../components/CustomStyledComponent/Text';

import {DismissKeyboard} from '../../components/DismissKeyboard';
const Chat = () => {
  return (
    <DismissKeyboard>
      <SafeAreaView style={chatStyles.container}>
        <KeyboardAvoidingView style={chatStyles.container} behavior="padding">
          <ScrollView style={chatStyles.chatView}>
            <CustomText>hel</CustomText>
          </ScrollView>
          <ChatForm />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </DismissKeyboard>
  );
};

const chatStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatView: {
    padding: 10,
    flex: 1,
  },
});

export default Chat;
