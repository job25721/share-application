/* eslint-disable react-hooks/exhaustive-deps */
import React, {createContext, useCallback, useEffect, useState} from 'react';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import store, {useDispatch} from './src/store';

import TabScreen, {pages} from './src/pages';
import {ApolloError, ApolloProvider, useQuery} from '@apollo/client';
import client from './src/graphql/client';
import {Item} from './src/store/item/types';
import {Request, RequestStatus} from './src/store/request/types';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {User} from './src/store/user/types';

import 'react-native-gesture-handler';
import {GetAllItemQueryType, GET_ALL_ITEM} from './src/graphql/query/item';

import {
  GetRequestsQueryType,
  GET_MY_RECEIVING_ITEM,
  GET_MY_REQUESTS,
} from './src/graphql/query/request';
import {Alert} from 'react-native';

const RootStack = createStackNavigator();

interface ISubNavigator<T extends ParamListBase, K extends keyof T> {
  screen: K;
  params?: T[K];
}

type ChatNestedNavigation =
  | ISubNavigator<ChatStackParamList, 'Index'>
  | ISubNavigator<ChatStackParamList, 'Person'>;

export type RootStackParamList = {
  Tab: undefined;
  Auth: undefined;
  Profile: {userInfo: User};
  Detail: {itemData: Item; wishlist: boolean};
  Share: undefined;
  Chat: ChatNestedNavigation;
};

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <RootStackScreen />
        </ApolloProvider>
      </Provider>
    </NavigationContainer>
  );
};

interface FeedRefresh {
  refresh: () => Promise<void> | undefined;
  refreshing: boolean;
  itemLoading: boolean;
  error: ApolloError | undefined;
}
interface RequestRefresh {
  refresh: () => Promise<void> | undefined;
  refreshing: boolean;
  requestLoading: boolean;
  error: ApolloError | undefined;
}

type RefreshContext = {
  feedHome: FeedRefresh;
  mySendRequests: RequestRefresh;
  myReceiveRequest: RequestRefresh;
};

export const RefreshContext = createContext<RefreshContext>({
  feedHome: {
    refresh: () => undefined,
    refreshing: false,
    itemLoading: false,
    error: undefined,
  },
  mySendRequests: {
    refresh: () => undefined,
    refreshing: false,
    requestLoading: false,
    error: undefined,
  },
  myReceiveRequest: {
    refresh: () => undefined,
    refreshing: false,
    requestLoading: false,
    error: undefined,
  },
});

const {Auth, Share, Detail, Profile, Chat} = pages;
const {ChatIndex, ChatRoom, PersonModal} = Chat;
const RootStackScreen: React.FC = () => {
  const dispatch = useDispatch();

  const feedQuery = useQuery<GetAllItemQueryType>(GET_ALL_ITEM);
  const [feedRefreshing, setFeedRefresh] = useState<boolean>(false);
  const refetchItem = useCallback(async () => {
    setFeedRefresh(true);
    try {
      const refetchItemRes = await feedQuery.refetch();
      if (refetchItemRes.data) {
        dispatch({
          type: 'SET_FEED_ITEMS',
          payload: refetchItemRes.data.getAllItem.filter(
            ({status}) => status === 'available',
          ),
        });
      }
      setFeedRefresh(false);
    } catch (err) {
      console.log(err);
    }
  }, [feedQuery.refetch]);

  const mySendRequetsQuery = useQuery<GetRequestsQueryType>(
    GET_MY_RECEIVING_ITEM,
  );
  const [
    mySendRequestRefreshing,
    setMySendRequestRefreshing,
  ] = useState<boolean>(false);
  const refetchMySendRequests = useCallback(async () => {
    setMySendRequestRefreshing(true);
    try {
      const refetchMyRequestsRes = await mySendRequetsQuery.refetch();
      if (refetchMyRequestsRes.data.getMySendRequests) {
        dispatch({
          type: 'SET_MY_SEND_REQUETS',
          payload: refetchMyRequestsRes.data.getMySendRequests
            .slice(0)
            .sort((a, b) => {
              return b.chat.lastestUpdate - a.chat.lastestUpdate;
            }),
        });
        setMySendRequestRefreshing(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, [mySendRequetsQuery.refetch]);

  const myReceiveRequestQuery = useQuery<GetRequestsQueryType>(GET_MY_REQUESTS);
  const [
    myReceiveRequestRefresing,
    setmyReceiveRequestRefresing,
  ] = useState<boolean>(false);
  const refetchMyReceiveRequests = useCallback(async () => {
    setmyReceiveRequestRefresing(true);
    try {
      const refetchMyReceiveRequestsRes = await myReceiveRequestQuery.refetch();
      if (refetchMyReceiveRequestsRes.data.getMyRequests) {
        dispatch({
          type: 'SET_MY_RECEIVE_REQUETS',
          payload: refetchMyReceiveRequestsRes.data.getMyRequests
            .slice(0)
            .sort((a, b) => {
              return b.chat.lastestUpdate - a.chat.lastestUpdate;
            }),
        });
        setmyReceiveRequestRefresing(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, [myReceiveRequestQuery.refetch]);

  useEffect(() => {
    const refetch = async () => {
      try {
        await refetchItem();
        await refetchMySendRequests();
        await refetchMyReceiveRequests();
      } catch (error) {
        Alert.alert(error.message);
      }
    };
    refetch();
  }, []);

  useEffect(() => {
    const getToken = async () => {
      console.log('in');
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          dispatch({type: 'SET_TOKEN', payload: token});
          const user = await AsyncStorage.getItem('userInfo');
          if (user) {
            dispatch({
              type: 'SET_USER_DATA',
              payload: JSON.parse(user),
            });
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    getToken();
  }, []);
  return (
    <RefreshContext.Provider
      value={{
        feedHome: {
          refresh: refetchItem,
          refreshing: feedRefreshing,
          itemLoading: feedQuery.loading,
          error: feedQuery.error,
        },
        mySendRequests: {
          refresh: refetchMySendRequests,
          refreshing: mySendRequestRefreshing,
          requestLoading: mySendRequetsQuery.loading,
          error: mySendRequetsQuery.error,
        },
        myReceiveRequest: {
          refresh: refetchMyReceiveRequests,
          refreshing: myReceiveRequestRefresing,
          requestLoading: myReceiveRequestQuery.loading,
          error: myReceiveRequestQuery.error,
        },
      }}>
      <RootStack.Navigator mode="card">
        <RootStack.Screen
          name="Tab"
          component={TabScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="Detail"
          component={Detail}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="Share"
          component={Share}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="Chat"
          component={ChatStackScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
      </RootStack.Navigator>
    </RefreshContext.Provider>
  );
};

const ChatStack = createStackNavigator();
export type ChatStackParamList = {
  Index: undefined;
  Person: {requests: Request[]; itemName: string};
  ChatRoom: undefined;
};

const ChatStackScreen: React.FC = () => (
  <ChatStack.Navigator mode="modal">
    <ChatStack.Screen
      name="Index"
      component={ChatIndex}
      options={{headerShown: false}}
    />
    <ChatStack.Screen
      name="ChatRoom"
      component={ChatRoom}
      options={{headerShown: false}}
    />
    <ChatStack.Screen
      name="Person"
      component={PersonModal}
      options={{headerShown: false}}
    />
  </ChatStack.Navigator>
);

export default App;
