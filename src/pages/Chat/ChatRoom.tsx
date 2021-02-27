/* eslint-disable react-native/no-inline-styles */
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Keyboard,
  ScrollView,
  Platform,
  View,
  Image,
  Alert,
} from 'react-native';

import {ChatBubble, Form} from '../../components/Chat';
import {Colors} from '../../utils/Colors';
import {CustomText, Button} from '../../components/custom-components';

import Feather from 'react-native-vector-icons/Feather';
import {RouteProp} from '@react-navigation/native';
import {ChatStackParamList, RefreshContext} from '../../../App';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {RootState, useDispatch} from '../../store';
import AcceptAlert from '../../components/Chat/AcceptAlert';
import {
  ACCEPT_DELIVERED,
  ACCEPT_REQUEST,
  REJECT_REQUEST,
} from '../../graphql/mutation/request';
import {useMutation} from '@apollo/client';
import {
  acceptDeliveredAction,
  acceptRequestAction,
  rejectRequestAction,
  SendMessageAction,
} from '../../store/chat/actions';

import Modal from 'react-native-modalbox';
import {
  SendMessageInput,
  SendMessageReturnType,
  SEND_MESSAGE,
} from '../../graphql/mutation/chat';

type ChatRoomScreenRouteProp = RouteProp<ChatStackParamList, 'ChatRoom'>;
type ChatRoomScreenNavigationProp = StackNavigationProp<
  ChatStackParamList,
  'ChatRoom'
>;

type Props = {
  route: ChatRoomScreenRouteProp;
  navigation: ChatRoomScreenNavigationProp;
};

interface ModalContextType {
  setAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalContext = createContext<ModalContextType>({
  setAlert: () => null,
});
const ChatRoom: React.FC<Props> = ({navigation, route}) => {
  const {type} = route.params;

  const messages = useSelector((state: RootState) => state.chat.messages);
  const scrollRef = useRef<ScrollView>(null);
  const [alertMsg, setAlert] = useState<boolean>(false);
  const currentUser = useSelector((state: RootState) => state.user.userData);
  const {chatWith, currentProcessRequest, loadingAction} = useSelector(
    (state: RootState) => state.chat,
  );
  const {item, status, requestPerson, chat, id} = currentProcessRequest;

  const [acceptRequest] = useMutation(ACCEPT_REQUEST);
  const [acceptDelivered] = useMutation(ACCEPT_DELIVERED);
  const [requestRequest] = useMutation(REJECT_REQUEST);
  const [sendMessage] = useMutation<SendMessageReturnType, SendMessageInput>(
    SEND_MESSAGE,
  );
  const dispatch = useDispatch();
  const {feedHome} = useContext(RefreshContext);
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

  if (chatWith) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={chatStyles.container}>
        <Modal
          isOpen={loadingAction}
          position="center"
          style={{
            width: '90%',
            height: '18%',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CustomText fontSize={25} fontWeight="bold">
            กรุณารอสักครู่....
          </CustomText>
        </Modal>
        {currentUser?.id === item.owner.id &&
        status === 'requested' &&
        item.status === 'available' ? (
          <AcceptAlert
            open={alertMsg}
            onClosePress={() => setAlert(false)}
            onConfirm={async () => {
              setAlert(false);
              await acceptRequestAction(acceptRequest)(dispatch);
              // await myReceiveRequest.refresh();
              await feedHome.refresh();
            }}
            onReject={async () => {
              setAlert(false);
              await rejectRequestAction(requestRequest)(dispatch);
            }}
            title="ยืนยันการส่งต่อ"
            bindColor={true}
            content={`ทำการส่งต่อ ${item.name} ให้กับ ${chatWith.info.firstName} `}
            confirmText="ยืนยัน"
            cancelText="ไว้ก่อน"
            hasReject={true}
            rejectText="ปฏิเสธ"
          />
        ) : status === 'accepted' ? (
          <AcceptAlert
            open={alertMsg}
            onClosePress={() => setAlert(false)}
            onConfirm={async () => {
              setAlert(false);
              await acceptDeliveredAction(acceptDelivered)(dispatch);

              Alert.alert(
                'กระบวนการ SHARE เสร็จสิ้น',
                'ห้องแชทได้ถูกปิดแล้ว ขอบพระคุณที่ใช้บริการของเรา',
              );
            }}
            title="ยืนยันการรับ"
            content="ท่านได้รับของที่ท่านร้องของเรียบร้อยแล้ว ?"
            confirmText="ได้รับแล้ว"
            cancelText="ยังไม่ได้รับ"
          />
        ) : (
          <Modal
            isOpen={alertMsg}
            position="center"
            style={{
              width: '90%',
              height: '18%',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomText color={Colors._red_500} fontSize={20} fontWeight="bold">
              ของชิ้นนี้คุณได้ส่งต่อให้คนอื่นไปแล้ว
            </CustomText>
          </Modal>
        )}

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
          <ModalContext.Provider value={{setAlert}}>
            {chat.active ? (
              <Form
                onSendMessage={(message) =>
                  SendMessageAction(
                    sendMessage,
                    {
                      chatRoomId: chat.id,
                      messagePayload: {
                        from: currentUser ? currentUser.id : '',
                        to: chatWith.id,
                        message,
                        timestamp: new Date(),
                      },
                    },
                    {
                      requestId: id,
                      itemId: type === 'Item' ? undefined : item.id,
                    },
                  )(dispatch)
                }
                hasAcceptBtn={
                  (status === 'requested' &&
                    currentUser?.id === item.owner.id) ||
                  (status === 'accepted' &&
                    currentUser?.id === requestPerson.id)
                    ? true
                    : false
                }
              />
            ) : null}
          </ModalContext.Provider>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
  return null;
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
