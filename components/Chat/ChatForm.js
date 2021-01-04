import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Button} from '../CustomStyledComponent/Button/CustomButton';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {Colors} from '../CustomStyledComponent/Colors';
export default () => {
  const [msg, setMsg] = useState('');
  return (
    <View style={chatFromStyles.msgBox}>
      <View style={chatFromStyles.btnView}>
        <Button rounded bg={Colors._indigo_500}>
          <FeatherIcon name="plus" size={25} color={Colors.white} />
        </Button>
      </View>
      <View style={chatFromStyles.chatInputView}>
        <TextInput
          style={chatFromStyles.chatInput}
          focus
          multiline
          placeholder="Type a message..."
          onChangeText={(val) => setMsg(val.split('\n'))}
        />
      </View>
      <View style={chatFromStyles.btnView}>
        <Button onPress={() => console.log(msg)} rounded bg={Colors._blue_500}>
          <FeatherIcon name="send" color={Colors.white} size={25} />
        </Button>
      </View>
    </View>
  );
};

const chatFromStyles = StyleSheet.create({
  msgBox: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-between',
  },
  chatInputView: {
    justifyContent: 'center',
    width: '50%',
  },
  chatInput: {
    width: '100%',
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingTop: 10,
    borderRadius: 15,
    maxHeight: 200,
  },
  btnView: {
    alignSelf: 'flex-end',
    width: 'auto',
  },
});
