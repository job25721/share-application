import React, {createContext, useEffect, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Keyboard,
  ScrollView,
  Platform,
} from 'react-native';

import ChatBubble from '../../components/Chat/ChatBubble';
import ChatForm from '../../components/Chat/ChatForm';
import {Colors} from '../../utils/Colors';

export const ChatContext = createContext({});
const Chat = () => {
  const now = new Date();
  const [messages, setMessage] = useState([
    {
      pos: 'left',
      msg: ['ผมจะบริจาคให้ 1000 บาท'],
      time: now.getHours() + ':' + now.getMinutes() + ' PM',
    },
    {
      pos: 'right',
      msg: ['แต่...', 'แต่ว่า'],
      time: now.getHours() + ':' + now.getMinutes() + ' PM',
    },
    {
      pos: 'right',
      msg: ['ผมจะให้คุณ'],
      time: now.getHours() + ':' + now.getMinutes() + ' PM',
    },
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
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
              <ChatBubble
                key={i}
                time={data.time}
                pos={data.pos}
                msg={data.msg}
              />
            ))}
          </ScrollView>
          <ChatForm />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ChatContext.Provider>
  );
};

const chatStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  chatView: {
    paddingHorizontal: 10,

    backgroundColor: Colors.white,
  },
});

export default Chat;