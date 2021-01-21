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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect, useDispatch} from 'react-redux';
import {SET_USER_DATA} from '../../store/actions/user';

const updateUser = (userData) => (dispatch) => {
  dispatch({type: SET_USER_DATA, payload: userData});
};

const mapStateToProps = (state) => ({
  userData: state.user.userData,
  token: state.user.token,
});
const connector = connect(mapStateToProps, {updateUser});

const HomeHeader = (props) => {
  const navigation = useNavigation();
  const {data, loading, error, refetch} = useQuery(getMyInfo);

  useEffect(() => {
    const refetchUserData = async () => {
      try {
        await refetch();
      } catch (err) {
        console.log(err);
      }
    };
    refetchUserData();
    if (data) {
      props.updateUser(data);
    }
  }, [data, props, refetch]);

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
          onPress={() => {
            navigation.navigate('Auth');
          }}
        />
      </View>
    );
  }

  if (data && props.userData) {
    return (
      <View style={styles.headerContainer}>
        <View style={{flexDirection: 'row'}}>
          <Button px={0} onPress={() => navigation.navigate('Profile')}>
            <Image
              style={{
                height: 60,
                width: 60,
                borderRadius: 50,
                marginRight: 10,
              }}
              source={{uri: data.getMyInfo.avatar}}
            />
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
          <Button
            onPress={async () => {
              console.log(props);
              // navigation.navigate('Notification')
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

  return null;
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
});

export default connector(HomeHeader);
