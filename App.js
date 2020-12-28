import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Index from './pages/Index';
import Login from './pages/Login';
import Detail from './pages/Detail';

const Stack = createStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
        <Stack.Screen name="Details" component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
