import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';

import ChatIndex from './Chat/Index';

import Search from './Search';

import NavigationBar from '../components/CustomStyledComponent/NavigationBar';

const Tab = createBottomTabNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator tabBar={(props) => <NavigationBar {...props} />}>
      <Tab.Screen name="Index" component={Home} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
};

export default TabScreen;
