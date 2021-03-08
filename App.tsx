/* eslint-disable react-hooks/exhaustive-deps */
import React, {createContext, useEffect} from 'react';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import store, {useDispatch} from './src/store';

import {ApolloError, ApolloProvider} from '@apollo/client';
import client from './src/graphql/client';
import {Item} from './src/store/item/types';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {User} from './src/store/user/types';

import 'react-native-gesture-handler';

import {useFeedQuery} from './src/components/custom-hooks-graphql/FeedItem';
import {useMySavedItemQuery} from './src/components/custom-hooks-graphql/MySavedItem';

import TabScreen, {TabParamList} from './src/pages';
import Auth from './src/pages/Auth';
import Share from './src/pages/Share';
import Detail from './src/pages/Detail';
import Profile from './src/pages/Profile';
import ChatIndex, {ChatRoom, PersonModal} from './src/pages/Chat';
import {ChatCardType} from './src/components/Chat/ChatCard';
import {useChatSubscription} from './src/components/custom-hooks-graphql/ChatSucscription';
import {useMySendRquestsQuery} from './src/components/custom-hooks-graphql/MySendRequests';
import {useMyReceivingRequestsQuery} from './src/components/custom-hooks-graphql/MyReceivingRequests';
import {useRequestSubscription} from './src/components/custom-hooks-graphql/RequestSubscription';

const RootStack = createStackNavigator();

interface ISubNavigator<T extends ParamListBase, K extends keyof T> {
  screen: K;
  params?: T[K];
}

type ChatNestedNavigation =
  | ISubNavigator<ChatStackParamList, 'Index'>
  | ISubNavigator<ChatStackParamList, 'Person'>;

type TabNestedNavigation =
  | ISubNavigator<TabParamList, 'Home'>
  | ISubNavigator<TabParamList, 'Search'>;

export type RootStackParamList = {
  Tab: TabNestedNavigation;
  Auth: undefined;
  Profile: {userInfo: User; visitor: boolean};
  Detail: {item: Item; wishlist: boolean};
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
  itemLoading: boolean | undefined;
  error: ApolloError | undefined;
}
interface SavedItemRefresh {
  refresh: () => Promise<void> | undefined;
  refreshing: boolean;
  itemLoading: boolean;
  error: ApolloError | undefined;
}

type RefreshContext = {
  feedHome: FeedRefresh;
  savedItem: SavedItemRefresh;
};

export const RefreshContext = createContext<RefreshContext>({
  feedHome: {
    refresh: () => undefined,
    refreshing: false,
    itemLoading: false,
    error: undefined,
  },
  savedItem: {
    refresh: () => undefined,
    refreshing: false,
    itemLoading: false,
    error: undefined,
  },
});

const RootStackScreen: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getToken = async () => {
      try {
        console.log('getting token...');
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          console.log('token found!!!');
          console.log(token);
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

  useMySendRquestsQuery();
  useMyReceivingRequestsQuery();
  useChatSubscription();
  useRequestSubscription();
  useMyReceivingRequestsQuery();
  useMySendRquestsQuery();

  const [feedQuery, refetchItem, feedRefreshing] = useFeedQuery();
  const [
    savedItemQuery,
    refetchSavedItem,
    savedItemRefreshing,
  ] = useMySavedItemQuery();

  return (
    <RefreshContext.Provider
      value={{
        feedHome: {
          refresh: refetchItem,
          refreshing: feedRefreshing,
          itemLoading: feedQuery?.loading,
          error: feedQuery?.error,
        },
        savedItem: {
          refresh: refetchSavedItem,
          refreshing: savedItemRefreshing,
          itemLoading: savedItemQuery.loading,
          error: savedItemQuery.error,
        },
      }}>
      <RootStack.Navigator mode="modal">
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
  Person: {itemId: string; itemName: string};
  ChatRoom: {type: ChatCardType};
};

const ChatStackScreen: React.FC = () => (
  <ChatStack.Navigator mode="card">
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
