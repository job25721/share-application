import React, {createContext, useEffect, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
  Keyboard,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ChatBubble from '../../components/Chat/ChatBubble';
import ChatForm from '../../components/Chat/ChatForm';
import {Button} from '../../components/CustomStyledComponent/Button/CustomButton';

export const ChatContext = createContext({});
const Chat = () => {
  const [messages, setMessage] = useState([
    {pos: 'left', msg: ['ผมจะบริจาคให้ 1000 บาท']},
    {pos: 'right', msg: ['แต่...', 'แต่ว่า']},
    {pos: 'right', msg: ['ผมจะให้คุณ']},
  ]);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', onKeyboardShow);
    Keyboard.addListener('keyboardDidHide', onKeyboardHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', onKeyboardShow);
      Keyboard.removeListener('keyboardDidHide', onKeyboardHide);
    };
  }, []);

  const onKeyboardShow = () => {
    scrollRef.current.scrollToEnd({animate: true});
  };

  const onKeyboardHide = () => {
    scrollRef.current.scrollToEnd({animate: true});
  };

  const scrollRef = useRef(null);
  return (
    <ChatContext.Provider value={{messages, setMessage}}>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={90}
        style={chatStyles.container}>
        <SafeAreaView style={chatStyles.container}>
          <ScrollView
            onContentSizeChange={() =>
              scrollRef.current.scrollToEnd({animate: true})
            }
            ref={scrollRef}
            style={chatStyles.chatView}>
            {messages.map((data, i) => (
              <ChatBubble key={i} pos={data.pos} msg={data.msg} />
            ))}
          </ScrollView>
          <ChatForm />
          {/* <Button text="Click" onPress={onClick} /> */}
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ChatContext.Provider>
  );
};

const chatStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatView: {
    paddingHorizontal: 10,
  },
});

export default Chat;
