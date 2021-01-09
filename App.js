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

import Detail from './pages/Detail';
import {Alert} from 'react-native';
import TabScreen from './pages/Index';
import Chat from './pages/Chat/Chat';

const RootStack = createStackNavigator();

const RootStackScreen = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal">
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
            headerBackTitle: null,
          }}
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
