import React, {useContext} from 'react';
import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  View,
  RefreshControl,
} from 'react-native';

import {Colors, PantoneColor} from '../../utils/Colors';
import {CustomText, Button} from '../../components/custom-components';

import Feather from 'react-native-vector-icons/Feather';
import {RouteProp} from '@react-navigation/native';
import {ChatStackParamList, RefreshContext} from '../../../App';
import {StackNavigationProp} from '@react-navigation/stack';
import {ReceivingItemChat} from '../../components/Chat';

import {useSelector} from 'react-redux';
import {RootState, useDispatch} from '../../store';
import SendingItemChat from '../../components/Chat/SendingItemChat';

type ChatIndexScreenRouteProp = RouteProp<ChatStackParamList, 'Index'>;
type ChatIndexScreenNavigationProp = StackNavigationProp<
  ChatStackParamList,
  'Index'
>;

type Props = {
  route: ChatIndexScreenRouteProp;
  navigation: ChatIndexScreenNavigationProp;
};

const ChatIndex: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const activeIndex = useSelector((state: RootState) => state.chat.tabIndex);

  const {mySendRequests, myReceiveRequest} = useContext(RefreshContext);

  return (
    <SafeAreaView style={{backgroundColor: Colors.white, flex: 1}}>
      <View style={styles.header}>
        <Button onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={30} />
        </Button>

        <CustomText color={PantoneColor.livingCoral} fontSize={35}>
          Chat
        </CustomText>
      </View>
      <View style={styles.chatTab}>
        <Button
          onPress={() => dispatch({type: 'SET_TAB_INDEX', payload: 0})}
          bg={activeIndex === 0 ? PantoneColor.livingCoral : 'transparent'}>
          <CustomText color={activeIndex === 0 ? Colors.white : Colors.black}>
            ของที่กำลังขอรับ
          </CustomText>
        </Button>
        <Button
          onPress={() => dispatch({type: 'SET_TAB_INDEX', payload: 1})}
          bg={activeIndex === 1 ? PantoneColor.blueDepths : 'transparent'}>
          <CustomText color={activeIndex === 1 ? Colors.white : Colors.black}>
            ของที่กำลังส่งต่อ
          </CustomText>
        </Button>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={
              activeIndex === 0
                ? mySendRequests.refreshing
                : myReceiveRequest.refreshing
            }
            onRefresh={
              activeIndex === 0
                ? mySendRequests.refresh
                : myReceiveRequest.refresh
            }
          />
        }
        style={styles.container}>
        {activeIndex === 0 ? <ReceivingItemChat /> : <SendingItemChat />}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  header: {flexDirection: 'row', marginTop: 20},
  chatTab: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 10,
  },
});

export default ChatIndex;
