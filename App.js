import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Index from './pages/Index';
import Login from './pages/Login';
import Detail from './pages/Detail';
import Home from './pages/Home';
import {Button} from './components/CustomStyledComponent/Button/CustomButton';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Chat from './pages/Chat/Chat';
import {Text} from 'react-native';
import ChatIndex from './pages/Chat/Index';

const Stack = createStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="People"
          component={ChatIndex}
          options={{headerTitle: 'Chat'}}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{headerTitle: (props) => <Text>Stamp Watcharin</Text>}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Index}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            headerRight: () => (
              <Button text={<FeatherIcon name="bookmark" size={20} />} />
            ),
          }}
        />
        <Stack.Screen
          name="Index"
          component={Home}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
