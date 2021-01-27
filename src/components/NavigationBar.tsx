import React from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {Colors, PantoneColor} from '../utils/Colors';
import {Button} from './custom-components';

const Routes = {
  home: 'Index',
  search: 'Search',
  addItem: 'Share',
};

import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

const NavigationBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const routeName = state.routeNames[state.index];

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <SafeAreaView>
      <View style={styles.appBar}>
        <Button onPress={() => navigation.navigate(Routes.home)} px={0}>
          <Feather
            color={
              routeName === Routes.home
                ? PantoneColor.livingCoral
                : Colors.black
            }
            size={routeName === Routes.home ? 35 : 30}
            name="home"
          />
        </Button>
        <Button onPress={() => navigation.navigate(Routes.addItem)} px={0}>
          <Feather
            name="plus"
            color={
              routeName === Routes.addItem
                ? PantoneColor.livingCoral
                : Colors.black
            }
            size={routeName === Routes.addItem ? 35 : 30}
          />
        </Button>
        <Button onPress={() => navigation.navigate(Routes.search)} px={0}>
          <Feather
            color={
              routeName === Routes.search
                ? PantoneColor.livingCoral
                : Colors.black
            }
            size={routeName === Routes.search ? 35 : 30}
            name="search"
          />
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingHorizontal: '7%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
  },
});

export default NavigationBar;
