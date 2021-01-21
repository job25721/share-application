import React, {useContext, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Button} from '../CustomStyledComponent/Button/CustomButton';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {ChatContext} from '../../pages/Chat/Chat';
import {Colors} from '../../utils/Colors';
import ChatModal from '../AlertDialog';

export default () => {
  const [msg, setMsg] = useState('');
  const {messages, setMessage} = useContext(ChatContext);
  const [alertMsg, setAlert] = useState(false);

  return (
    <View style={chatFromStyles.msgBox}>
      <ChatModal
        open={alertMsg}
        onClosePress={() => setAlert(false)}
        onConfirm={() => {
          setAlert(false);
        }}
        title="ยืนยันการส่งต่อ"
        bindColor={true}
        content="ท่านได้ทำการส่งต่อสิ่งของแล้วใช่หรือไม่"
        confirmText="ยืนยัน"
        cancelText="ไม่ยืนยัน"
      />
      {/* <ChatModal
        hasCancel={false}
        open={alertMsg}
        onClosePress={() => setAlert(false)}
        onConfirm={() => {
          setAlert(false);
        }}
        title="ยืนยันการส่งต่อ"
        content="ท่านได้ทำการส่งต่อสิ่งของแล้วใช่หรือไม่"
        confirmText="ยืนยัน"
        cancelText="ไม่ยืนยัน"
      /> */}
      <View style={chatFromStyles.chatInputView}>
        <TextInput
          style={chatFromStyles.chatInput}
          focus
          multiline
          placeholder="Type a message..."
          value={msg}
          onChangeText={(val) => {
            console.log(val);
            setMsg(val);
          }}
        />
      </View>
      <View style={chatFromStyles.btnView}>
        <Button onPress={() => setAlert(true)}>
          <FeatherIcon
            name="check-square"
            color={Colors._indigo_800}
            size={20}
          />
        </Button>
        <Button
          onPress={() => {
            if (msg !== '') {
              setMessage([
                ...messages,
                {
                  pos: 'right',
                  msg: msg.split('\n'),
                  time: `${new Date().getHours()}:${new Date().getMinutes()}`,
                },
              ]);
              setMsg('');
            }
          }}
          py={12}
          px={10}>
          <FeatherIcon name="send" color={Colors._indigo_800} size={20} />
        </Button>
      </View>
    </View>
  );
};

const chatFromStyles = StyleSheet.create({
  msgBox: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: Colors.white,
    marginLeft: 5,
  },
  chatInputView: {
    justifyContent: 'center',
    width: '65%',
  },
  chatInput: {
    width: '100%',
    backgroundColor: Colors._gray_900,
    paddingHorizontal: 10,
    paddingVertical: 12,
    paddingTop: 12,
    borderRadius: 15,
    maxHeight: 200,
  },
  btnView: {
    width: 'auto',
    height: '100%',
    flexDirection: 'row',
  },
});
