import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';

import NewItem from './pages/NewItem';

import {Button} from './components/CustomStyledComponent/Button/CustomButton';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Login from './pages/Login';
import PersonModal from './pages/Chat/PersonModal';
import {Colors} from './utils/Colors';
import Noti from './pages/Notification';
import Detail from './pages/Detail';
import TabScreen from './pages/Index';
import Chat from './pages/Chat/Chat';
import Register from './pages/Register';
import ChatIndex from './pages/Chat/Index';

const RootStack = createStackNavigator();

const RootStackScreen = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="card">
        <RootStack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="Notification"
          component={Noti}
          options={{
            headerRight: () => (
              <Button
                text={<FeatherIcon color="black" name="bell" size={30} />}
              />
            ),
          }}
        />
        <RootStack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="Tab"
          component={TabScreen}
          options={{headerShown: false}}
        />
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
          name="SHARE"
          component={NewItem}
          options={{
            headerShown: false,
          }}
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
