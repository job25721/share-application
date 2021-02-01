import React, {createContext, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  View,
  RefreshControl,
} from 'react-native';

import {Colors, PantoneColor} from '../../utils/Colors';
import {
  CustomText,
  Button,
  AlertDialog,
} from '../../components/custom-components';

import Feather from 'react-native-vector-icons/Feather';
import {RouteProp} from '@react-navigation/native';
import {ChatStackParamList} from '../../../App';
import {StackNavigationProp} from '@react-navigation/stack';
import {ReceivingItemChat, SendingItemChat} from '../../components/Chat';

import {useSelector} from 'react-redux';
import {RootState, useDispatch} from '../../store';
import ChatRoom from './ChatRoom';
import PersonModal from './PersonModal';
import {useMySendRquestsQuery} from '../../components/custom-hooks-graphql/MySendRequests';
import {useMyReceivingRequestsQuery} from '../../components/custom-hooks-graphql/MyReceivingRequests';
import {QueryResult} from '@apollo/client';
import {GetRequestsQueryType} from '../../graphql/query/request';
import {Request} from '../../store/request/types';

type ChatIndexScreenRouteProp = RouteProp<ChatStackParamList, 'Index'>;
type ChatIndexScreenNavigationProp = StackNavigationProp<
  ChatStackParamList,
  'Index'
>;

type Props = {
  route: ChatIndexScreenRouteProp;
  navigation: ChatIndexScreenNavigationProp;
};

interface RequestsQueryContext {
  query: QueryResult<GetRequestsQueryType> | undefined;
  refetch: () => Promise<void> | undefined;
}

type ChatContextTypes = {
  mySendRequests: RequestsQueryContext;
  myReceiveRequests: RequestsQueryContext;
};

const ChatContext = createContext<ChatContextTypes>({
  mySendRequests: {
    query: undefined,
    refetch: () => undefined,
  },
  myReceiveRequests: {
    query: undefined,
    refetch: () => undefined,
  },
});

const ChatIndex: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const activeIndex = useSelector((state: RootState) => state.chat.tabIndex);

  const [
    mySendRequestquery,
    refetchMySendRequests,
    mySendRequestRefreshing,
  ] = useMySendRquestsQuery();
  const [
    myReceiveQuery,
    refetchMyReceive,
    myReceiveRefreshing,
  ] = useMyReceivingRequestsQuery();

  useEffect(() => {
    const refetch = async () => {
      await refetchMySendRequests();
      await refetchMyReceive();
    };
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: Colors.white, flex: 1}}>
      {myReceiveQuery.loading && mySendRequestquery.loading ? (
        <AlertDialog title="กรุณารอสักครู่..." disabledBtn open={true} />
      ) : null}
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
      {/* <Button
        text="test"
        onPress={() => {
          const x: Request = {
            id: '1233',
            requestPerson: {
              id: '1231323',
              username: 'asdad',
              avatar: '1123',
              info: {
                firstName: 'asdasd',
                lastName: 'asdasdas',
                birthDate: '12,22023',
                age: 12,
              },
            },
            item: {
              id: 'asdad',
              name: 'sss',
              category: 'asdad',
              status: 'available',
              tags: [],
              owner: {
                id: '1231323',
                username: 'asdad',
                avatar: '1123',
                info: {
                  firstName: 'asdasd',
                  lastName: 'asdasdas',
                  birthDate: '12,22023',
                  age: 12,
                },
              },
              description: 'aasdsd',
              createdDate: '123.1231232',
              images: ['ss'],
            },
            chat: {
              id: 'asdasd',
              data: [],
              lastestUpdate: Date.now(),
              active: true,
            },
          };
          dispatch({type: 'ADD_MY_SEND_REQUETS', payload: x});
        }}
      /> */}

      <ChatContext.Provider
        value={{
          mySendRequests: {
            query: mySendRequestquery,
            refetch: refetchMySendRequests,
          },
          myReceiveRequests: {
            query: myReceiveQuery,
            refetch: refetchMyReceive,
          },
        }}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={
                activeIndex === 0
                  ? mySendRequestRefreshing
                  : myReceiveRefreshing
              }
              onRefresh={
                activeIndex === 0 ? refetchMySendRequests : refetchMyReceive
              }
            />
          }
          style={styles.container}>
          {activeIndex === 0 && !mySendRequestquery.loading ? (
            <ReceivingItemChat />
          ) : activeIndex === 1 && !myReceiveQuery.loading ? (
            <SendingItemChat />
          ) : null}
        </ScrollView>
      </ChatContext.Provider>
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

export {ChatRoom, PersonModal};

export default ChatIndex;
