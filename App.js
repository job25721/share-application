import React, {useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';

import NewItem from './pages/NewItem';

import {Button} from './components/CustomStyledComponent/Button/CustomButton';
import FeatherIcon from 'react-native-vector-icons/Feather';

import PersonModal from './pages/Chat/PersonModal';
import {Colors} from './utils/Colors';
import Noti from './pages/Notification';
import Detail from './pages/Detail';
import TabScreen from './pages/Index';
import Chat from './pages/Chat/Chat';

import ChatIndex from './pages/Chat/Index';
import Profile from './pages/Profile';

import store from './store';
import {Provider, useDispatch, useSelector} from 'react-redux';
import Auth from './pages/Auth';
import {ApolloProvider} from '@apollo/client';
import {client} from './graphql/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SET_TOKEN, SET_USER_DATA} from './store/actions/user';
const RootStack = createStackNavigator();

const ReduxScreenProvider = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  useEffect(() => {
    const getToken = async () => {
      const asyncToken = await AsyncStorage.getItem('userToken');
      if (asyncToken) {
        dispatch({type: SET_TOKEN, payload: asyncToken});
      }
      if (asyncToken === null) {
        dispatch({type: SET_USER_DATA, payload: null});
      }
    };
    getToken();
  }, [dispatch]);
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="card">
        <RootStack.Screen
          name="Tab"
          component={TabScreen}
          options={{headerShown: false}}
        />
        {token === null ? (
          <RootStack.Screen
            name="Auth"
            component={Auth}
            options={{headerShown: false, gestureEnabled: false}}
          />
        ) : null}
        <RootStack.Screen
          name="Detail"
          component={Detail}
          options={{
            headerRight: () => (
              <Button text={<FeatherIcon name="bookmark" size={20} />} />
            ),
            headerLeft: ({onPress}) => (
              <Button onPress={onPress}>
                <FeatherIcon color={Colors._red_600} name="x" size={25} />
              </Button>
            ),
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name="Chat"
          component={ChatStackScreen}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name="Notification"
          component={Noti}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name="SHARE"
          component={NewItem}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <RootStack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="PersonModal"
          component={PersonModal}
          options={{
            headerShown: false,
          }}
          // options={({route}) => ({
          //   title: route.params.user,
          //   headerLeft: ({onPress}) => (
          //     <Button onPress={onPress}>
          //       <FeatherIcon color={Colors._red_600} name="x" size={25} />
          //     </Button>
          //   ),
          // })}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const RootStackScreen = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ReduxScreenProvider />
      </ApolloProvider>
    </Provider>
  );
};

const ChatStack = createStackNavigator();
const ChatStackScreen = () => (
  <ChatStack.Navigator>
    <ChatStack.Screen
      name="Messages"
      component={ChatIndex}
      options={{
        headerShown: false,
      }}
    />
    <ChatStack.Screen
      name="ChatRoom"
      component={Chat}
      options={{
        headerShown: false,
      }}
      // options={({route}) => ({
      //   title: route.params.name,
      //   headerBackTitle: 'Messages',
      // })}
    />
  </ChatStack.Navigator>
);

export default RootStackScreen;
