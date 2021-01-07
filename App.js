import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Index from './pages/Index';
import Login from './pages/Login';
import Detail from './pages/Detail';
import NewItem from './pages/NewItem';
import Home from './pages/Home';
import {Button} from './components/CustomStyledComponent/Button/CustomButton';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Chat from './pages/Chat/Chat';
import ChatIndex from './pages/Chat/Index';
import PersonModal from './pages/Chat/PersonModal';
import {Colors} from './utils/Colors';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

const MainStackScreen = () => {
  return (
    <MainStack.Navigator mode="card">
      <MainStack.Screen name="NewItem" component={NewItem} />
      <MainStack.Screen
        name="People"
        component={ChatIndex}
        options={{
          headerTitle: 'Chat',
        }}
      />
      <MainStack.Screen
        name="Chat"
        component={Chat}
        options={({route}) => ({
          title: route.params.name,
        })}
      />
      <MainStack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="Home"
        component={Index}
        options={{headerShown: false}}
      />

      <MainStack.Screen
        name="Detail"
        component={Detail}
        options={{
          headerRight: () => (
            <Button text={<FeatherIcon name="bookmark" size={20} />} />
          ),
        }}
      />
      <MainStack.Screen
        name="Index"
        component={Home}
        options={{headerShown: false}}
      />
    </MainStack.Navigator>
  );
};

const RootStackScreen = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="PersonModal"
          component={PersonModal}
          options={({route}) => ({
            title: route.params.user,
            headerLeft: ({onPress}) => (
              <Button onPress={onPress}>
                <FeatherIcon color={Colors._red_600} name="x" size={25} />
              </Button>
            ),
          })}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackScreen;
