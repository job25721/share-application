import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NavigationBar from '../components/NavigationBar';

import Home from './Home';
import Search from './Search';
import Auth from './Auth';
import Detail from './Detail';
import Profile from './Profile';
import Share from './Share';
import ChatIndex, {ChatRoom, PersonModal} from './Chat';

const Tab = createBottomTabNavigator();
export type TabParamList = {
  Home: undefined;
  Search: {searchParam: string};
};
const TabScreen: React.FC = () => {
  return (
    <Tab.Navigator tabBar={(props) => <NavigationBar {...props} />}>
      <Tab.Screen name="Index" component={Home} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
};

export const pages = {
  Auth,
  Detail,
  Profile,
  Share,
  Chat: {ChatIndex, ChatRoom, PersonModal},
};

export default TabScreen;
