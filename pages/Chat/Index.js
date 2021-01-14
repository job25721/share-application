/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {ScrollView, StyleSheet, SafeAreaView, View} from 'react-native';
import NavigationBar from '../../components/CustomStyledComponent/NavigationBar';
import {ItemChatCard, PersonChatCard} from '../../components/Chat/ChatCard';
import {Colors, PantoneColor} from '../../utils/Colors';
import {CustomText} from '../../components/CustomStyledComponent/Text';
import {Button} from '../../components/CustomStyledComponent/Button/CustomButton';
import Feather from 'react-native-vector-icons/Feather';
import ReceivingItemChat from './ReceivingItemChat';
import SendingItemChat from './SendingItemChat';

const ChatIndex = (props) => {
  const {navigation} = props;
  const [activeIndex, setActive] = useState(0);
  return (
    <SafeAreaView style={{backgroundColor: Colors.white, flex: 1}}>
      <View style={{flexDirection: 'row'}}>
        <Button onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={30} />
        </Button>
        <CustomText color={PantoneColor.livingCoral} fontSize={35}>
          Chat
        </CustomText>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          margin: 10,
        }}>
        <Button
          onPress={() => setActive(0)}
          bg={activeIndex === 0 ? PantoneColor.livingCoral : 'transparent'}>
          <CustomText color={activeIndex === 0 ? Colors.white : Colors.black}>
            ของที่กำลังรับ
          </CustomText>
        </Button>
        <Button
          onPress={() => setActive(1)}
          bg={activeIndex === 1 ? PantoneColor.livingCoral : 'transparent'}>
          <CustomText color={activeIndex === 1 ? Colors.white : Colors.black}>
            ของที่กำลังส่งต่อ
          </CustomText>
        </Button>
      </View>
      <ScrollView style={styles.container}>
        {activeIndex === 0 ? <ReceivingItemChat /> : <SendingItemChat />}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
});

export default ChatIndex;
