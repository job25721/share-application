/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Button} from '../CustomStyledComponent/Button/CustomButton';
import {CustomText} from '../CustomStyledComponent/Text';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@apollo/client';
import {getMyInfo} from '../../graphql/query/user';

import {Colors, PantoneColor} from '../../utils/Colors';
const HomeHeader = () => {
  const {navigate} = useNavigation();

  const {data, loading, error, refetch} = useQuery(getMyInfo);
  useEffect(() => {
    refetch();
  }, []);

  if (loading) {
    return (
      <View style={styles.headerContainer}>
        <CustomText>Loading..</CustomText>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.headerContainer, {justifyContent: 'flex-end'}]}>
        <Button
          text="Login"
          bg={PantoneColor.livingCoral}
          color={Colors.white}
          onPress={() => navigate('Auth')}
        />
      </View>
    );
  }

  if (data) {
    return (
      <View style={styles.headerContainer}>
        <View style={{flexDirection: 'row'}}>
          <Button px={0} onPress={() => navigate('Profile')}>
            {data ? (
              <Image
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 50,
                  marginRight: 10,
                }}
                source={{uri: data.getMyInfo.avatar}}
              />
            ) : (
              <CustomText>hello</CustomText>
            )}
          </Button>
          <View style={{justifyContent: 'center', paddingRight: 10}}>
            <CustomText fontSize={14}>
              {data.getMyInfo.info.firstName} {data.getMyInfo.info.lastName}
            </CustomText>
            <CustomText fontSize={14} textAlign="left">
              @{data.getMyInfo.username}
            </CustomText>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Button onPress={() => navigate('Notification')} px={5}>
            <FeatherIcon name="bell" size={35} />
          </Button>
          <Button onPress={() => navigate('Chat')} px={5}>
            <FeatherIcon name="message-circle" size={35} />
          </Button>
        </View>
      </View>
    );
  }
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
