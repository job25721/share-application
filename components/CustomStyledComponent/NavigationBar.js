import React, {useEffect, useState} from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {Colors, PantoneColor} from '../../utils/Colors';
import {Button} from './Button/CustomButton';

const Routes = {
  home: 'Index',
  search: 'Search',
  addItem: 'SHARE',
  chat: 'Chat',
  profile: 'Profile',
};

const NavigationBar = ({state, descriptors, navigation}) => {
  const [current, setCurrent] = useState(null);
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const routeName = state.routeNames[state.index];

  useEffect(() => {
    setCurrent(routeName);
  }, [routeName]);

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <SafeAreaView>
      <View style={styles.appBar}>
        <Button
          onPress={() => navigation.navigate(Routes.home)}
          text={
            <Feather
              color={
                current === Routes.home
                  ? PantoneColor.livingCoral
                  : Colors.black
              }
              size={current === Routes.home ? 35 : 30}
              name="home"
            />
          }
          px={0}
        />
        <Button
          onPress={() => navigation.navigate(Routes.addItem)}
          text={
            <Feather
              name="plus"
              color={
                current === Routes.addItem
                  ? PantoneColor.livingCoral
                  : Colors.black
              }
              size={current === Routes.addItem ? 35 : 30}
            />
          }
          px={0}
        />
        <Button
          onPress={() => navigation.navigate(Routes.search)}
          text={
            <Feather
              color={
                current === Routes.search
                  ? PantoneColor.livingCoral
                  : Colors.black
              }
              size={current === Routes.search ? 35 : 30}
              name="search"
            />
          }
          px={0}
        />

        {/*<Button*/}
        {/*  onPress={() => navigation.navigate(Routes.profile)}*/}
        {/*  text={*/}
        {/*    <Feather*/}
        {/*      name="user"*/}
        {/*      color={*/}
        {/*        current === Routes.profile ? Colors._indigo_500 : Colors.black*/}
        {/*      }*/}
        {/*      size={current === Routes.profile ? 35 : 30}*/}
        {/*    />*/}
        {/*  }*/}
        {/*  px={0}*/}
        {/*/>*/}
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
  },
});

export default NavigationBar;
