import React, {createContext, useEffect, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Keyboard,
  ScrollView,
  Platform,
  View,
  Image,
} from 'react-native';

import ChatBubble from '../../components/Chat/ChatBubble';
import ChatForm from '../../components/Chat/ChatForm';
import {Colors, PantoneColor} from '../../utils/Colors';
import {CustomText} from '../../components/CustomStyledComponent/Text';
import {Button} from '../../components/CustomStyledComponent/Button/CustomButton';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

export const ChatContext = createContext({});
const Chat = ({route, navigation}) => {
  const now = new Date();
  const [messages, setMessage] = useState([
    {
      pos: 'right',
      msg: ['ผมจะบริจาคให้ 1000 บาท'],
      time: now.getHours() + ':' + now.getMinutes(),
    },
    {
      pos: 'right',
      msg: ['ประมาณ วันพรุ่งนี้ ตอนเที่ยง'],
      time: now.getHours() + ':' + now.getMinutes(),
    },
    {
      pos: 'left',
      msg: ['คุณพี่จะเอาชื่อขึ้นหน้าจอไหมค้า'],
      time: now.getHours() + ':' + now.getMinutes(),
    },
    {
      pos: 'right',
      msg: ['ไม่ต้องครับ ไม่จำเป็น...'],
      time: now.getHours() + ':' + now.getMinutes(),
    },
    {
      pos: 'left',
      msg: ['ขอบพระคุณค่ะ ขอให้คุณพี่มีแต่ความสุขความเจริญ'],
      time: now.getHours() + ':' + now.getMinutes(),
    },
    {
      pos: 'right',
      msg: ['แต่...', 'แต่ว่า'],
      time: now.getHours() + ':' + now.getMinutes(),
    },
    {
      pos: 'right',
      msg: ['ผมจะให้คุณ...'],
      time: now.getHours() + ':' + now.getMinutes(),
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

  const scrollRef = useRef();

  return (
    <ChatContext.Provider value={{messages, setMessage}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={chatStyles.container}>
        <SafeAreaView style={chatStyles.container}>
          <View style={chatStyles.header}>
            <Button px={15} onPress={() => navigation.goBack()}>
              <Feather size={25} name="arrow-left" />
            </Button>
            <Image
              style={chatStyles.userImg}
              source={require('../../assets/img/stamp.png')}
            />
            <CustomText fontSize={20}>{route.params.name}</CustomText>
          </View>
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
    paddingTop: 5,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  userImg: {
    height: 40,
    width: 40,
    borderRadius: 50,
    marginRight: 10,
  },
});

export default Chat;
