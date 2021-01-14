import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';

import ChatIndex from './Chat/Index';

import Search from './Search';

import {Button} from '../components/CustomStyledComponent/Button/CustomButton';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {createStackNavigator} from '@react-navigation/stack';
import Chat from './Chat/Chat';
import ProfileGeneral from './Profile/ProfileGeneral';
import ProfileSend from './Profile/ProfileSend';
import {Alert} from 'react-native';
import NewItem from './NewItem';
import {Colors} from '../utils/Colors';
import NavigationBar from '../components/CustomStyledComponent/NavigationBar';

const Tab = createBottomTabNavigator();

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name="Posts"
      component={ProfileGeneral}
      options={{
        headerLeft: () => null,
        headerRight: () => (
          <Button text={<FeatherIcon name="more-vertical" size={20} />} />
        ),
      }}
    />
    <ProfileStack.Screen
      name="ProfileSend"
      component={ProfileSend}
      options={{
        headerRight: () => (
          <Button text={<FeatherIcon name="more-vertical" size={20} />} />
        ),
      }}
    />
  </ProfileStack.Navigator>
);

const TabScreen = () => {
  return (
    <Tab.Navigator tabBar={(props) => <NavigationBar {...props} />}>
      <Tab.Screen name="Index" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
};

export default TabScreen;
