/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, CustomText, ProgressiveImage} from '../custom-components';

import FeatherIcon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

import {Colors, PantoneColor} from '../../utils/Colors';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../App';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const HomeHeader: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const userData = useSelector((state: RootState) => state.user.userData);

  if (userData) {
    return (
      <View style={styles.headerContainer}>
        <Button
          px={0}
          onPress={() => navigation.navigate('Profile', {userInfo: userData})}>
          <ProgressiveImage
            style={{
              height: 60,
              width: 60,
              borderRadius: 50,
            }}
            loadingType="spinner"
            source={{uri: userData.avatar}}
          />
        </Button>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View>
            <CustomText fontWeight="700" fontSize={15}>
              <FontAwesome5Icon
                size={15}
                color={Colors.facebook}
                name="facebook"
              />{' '}
              {userData.info.firstName}
            </CustomText>
            <CustomText fontWeight="700" fontSize={15}>
              {userData.info.lastName}
            </CustomText>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            right: 0,
            padding: 10,
          }}>
          <Button
            onPress={async () => {
              // console.log(props);
              // navigation.navigate('Notification');
            }}
            px={5}>
            <FeatherIcon name="bell" size={35} />
          </Button>
          <Button
            onPress={() => navigation.navigate('Chat', {screen: 'Index'})}
            px={5}>
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
    // justifyContent: 'space-between',
    // alignItems: 'center',

    padding: 20,
  },
});

export default HomeHeader;
