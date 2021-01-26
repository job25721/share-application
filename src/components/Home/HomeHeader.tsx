/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Button, CustomText} from '../custom-components';

import FeatherIcon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

import {Colors, PantoneColor} from '../../utils/Colors';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';

const HomeHeader: React.FC = () => {
  const navigation = useNavigation();

  const userData = useSelector((state: RootState) => state.user.userData);

  // useEffect(() => {
  //   console.log(userData);
  // }, [userData]);

  // if (loading) {
  //   return (
  //     <View style={styles.headerContainer}>
  //       <CustomText>Loading..</CustomText>
  //     </View>
  //   );
  // }

  if (userData) {
    return (
      <View style={styles.headerContainer}>
        <View style={{flexDirection: 'row'}}>
          <Button
            px={0}
            onPress={() => navigation.navigate('Profile', userData)}>
            <Image
              style={{
                height: 60,
                width: 60,
                borderRadius: 50,
                marginRight: 10,
              }}
              source={{uri: userData.avatar}}
            />
          </Button>
          <View style={{justifyContent: 'center', paddingRight: 10}}>
            <CustomText fontSize={14}>
              {userData.info.firstName} {userData.info.lastName}
            </CustomText>
            <CustomText fontSize={14} textAlign="left">
              @{userData.username}
            </CustomText>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Button
            onPress={async () => {
              // console.log(props);
              navigation.navigate('Notification');
            }}
            px={5}>
            <FeatherIcon name="bell" size={35} />
          </Button>
          <Button onPress={() => navigation.navigate('Chat')} px={5}>
            <FeatherIcon name="message-circle" size={35} />
          </Button>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.headerContainer, {justifyContent: 'flex-end'}]}>
      <Button
        text="Login"
        bg={PantoneColor.livingCoral}
        color={Colors.white}
        onPress={() => {
          navigation.navigate('Auth');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
});

export default HomeHeader;