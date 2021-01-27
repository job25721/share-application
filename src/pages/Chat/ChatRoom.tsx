import React, {useEffect, useRef} from 'react';
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

import {ChatBubble, Form} from '../../components/Chat';
import {Colors} from '../../utils/Colors';
import {CustomText, Button} from '../../components/custom-components';

import Feather from 'react-native-vector-icons/Feather';
import {RouteProp} from '@react-navigation/native';
import {ChatStackParamList} from '../../../App';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
type ChatRoomScreenRouteProp = RouteProp<ChatStackParamList, 'ChatRoom'>;
type ChatRoomScreenNavigationProp = StackNavigationProp<
  ChatStackParamList,
  'ChatRoom'
>;

type Props = {
  route: ChatRoomScreenRouteProp;
  navigation: ChatRoomScreenNavigationProp;
};
const ChatRoom: React.FC<Props> = ({route, navigation}) => {
  const messages = useSelector((state: RootState) => state.chat.messages);
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
    scrollRef.current?.scrollToEnd({animated: true});
  };

  const onKeyboardHide = () => {
    scrollRef.current?.scrollToEnd({animated: true});
  };

  const scrollRef = useRef<ScrollView>(null);
  const {chatWith} = route.params;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={chatStyles.container}>
      <SafeAreaView style={chatStyles.container}>
        <View style={chatStyles.header}>
          <Button px={15} onPress={() => navigation.goBack()}>
            <Feather size={25} name="arrow-left" />
          </Button>
          <Image style={chatStyles.userImg} source={{uri: chatWith.avatar}} />
          <CustomText fontSize={20}>
            {chatWith.info.firstName} {chatWith.info.lastName}
          </CustomText>
        </View>
        <ScrollView
          onContentSizeChange={() =>
            scrollRef.current?.scrollToEnd({animated: true})
          }
          ref={scrollRef}
          style={chatStyles.chatView}>
          {messages.map((data, i) => (
            <ChatBubble chatData={data} key={i.toString()} />
          ))}
        </ScrollView>
        <Form />
      </SafeAreaView>
    </KeyboardAvoidingView>
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

export default ChatRoom;
