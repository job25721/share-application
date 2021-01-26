import React, {useContext, useState} from 'react';

import {View, Image, StyleSheet, Alert} from 'react-native';
import {Button, Input, CustomText, AlertDialog} from '../custom-components';
import {Colors, PantoneColor} from '../../utils/Colors';

import {useNavigation} from '@react-navigation/native';
import {USER_LOGIN} from '../../graphql/mutation/user';
// import {useDispatch} from '../../store';
import {useMutation, useQuery} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GET_MY_INFO, MyInfoQueryType} from '../../graphql/query/user';
import {StackNavigationProp} from '@react-navigation/stack';
import {RefreshContext, RootStackParamList} from '../../../App';
import {useDispatch} from '../../store';

const Login: React.FC = () => {
  const {navigate}: StackNavigationProp<RootStackParamList> = useNavigation();

  const [username, setUsername] = useState<string>('guy');
  const [password, setPassword] = useState<string>('1234');
  const [loading, setLoading] = useState<boolean>(false);
  const [login] = useMutation(USER_LOGIN);
  const user = useQuery<MyInfoQueryType>(GET_MY_INFO);
  const dispatch = useDispatch();
  const {mySendRequests, myReceiveRequest} = useContext(RefreshContext);
  const loginAction = async () => {
    if (username !== '' && password !== '') {
      try {
        setLoading(true);
        const {data} = await login({
          variables: {
            username,
            password,
          },
        });
        if (data.login === 'Login Failed') {
          throw new Error(data.login);
        }
        dispatch({type: 'SET_TOKEN', payload: data.login});
        await AsyncStorage.setItem('userToken', data.login);
        console.log('requerying...');
        const refetchUser = await user.refetch();
        console.log(refetchUser);

        if (refetchUser.error) {
          throw new Error(refetchUser.error.message);
        }
        console.log(data);
        if (refetchUser.data) {
          console.log('complete');
          console.log(refetchUser.data);
          await AsyncStorage.setItem(
            'userInfo',
            JSON.stringify(refetchUser.data?.getMyInfo),
          );
          dispatch({
            type: 'SET_USER_DATA',
            payload: refetchUser.data?.getMyInfo,
          });
          await mySendRequests.refresh();
          await myReceiveRequest.refresh();
          navigate('Tab');
        }
      } catch (error) {
        setLoading(false);
        Alert.alert(error.message);
      }
    } else {
      Alert.alert('Please fill');
    }
  };

  return (
    <>
      <AlertDialog open={loading} disabledBtn title="กรุณารอสักครู่...." />
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../assets/img/logo.png')}
        />
        <CustomText spacing={10} color={PantoneColor.livingCoral} type="header">
          SHARE
        </CustomText>
      </View>

      {/* <View style={styles.btnView}>
        <Button
          rounded
          px={0}
          py={10}
          bg={Colors.facebook}
          onPress={() => navigate('Tab')}>
          <View style={styles.rowBtntext}>
            <FontAwesome
              style={{paddingHorizontal: 10}}
              color={Colors.white}
              size={35}
              name="facebook"
            />
            <CustomText color={Colors.white}>ล็อกอินผ่าน Facebook</CustomText>
          </View>
        </Button>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
            marginHorizontal: 30,
          }}>
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
          <View>
            <Text style={{width: 50, fontSize: 16, textAlign: 'center'}}>
              OR
            </Text>
          </View>
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View>
        <Button
          rounded
          px={0}
          py={10}
          bg={Colors.google}
          onPress={() => navigate('Tab')}>
          <View style={styles.rowBtntext}>
            <FontAwesome
              style={{paddingHorizontal: 10}}
              color={Colors.white}
              size={35}
              name="google"
            />
            <CustomText color={Colors.white}>ล็อกอินผ่าน Google</CustomText>
          </View>
        </Button>
      </View> */}
      <View style={styles.inputContainer}>
        <Input
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          focus
          rounded
          width="100%"
        />
        <Input
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          focus
          rounded
          width="100%"
        />
        <Button
          text="Login"
          bg={PantoneColor.turkishSea}
          color={Colors.white}
          rounded
          my={10}
          onPress={loginAction}
        />
      </View>
      {/* 
      <View
        style={{
          alignItems: 'center',
        }}>
        <CustomText color="#b5b5b5" fontSize={15}>
          Or Continute With
        </CustomText>
        <View style={styles.socialLogin}>
          <Button
            text={
              <FontAwesomeIcon
                style={[styles.icon, {color: Colors.facebook}]}
                name="facebook"
                size={30}
              />
            }
            px={0}
            mx={10}
            onPress={() => Alert.alert('Facebook')}
          />
          <Button
            text={
              <FontAwesomeIcon
                style={[styles.icon, {color: Colors.google}]}
                name="google"
                size={30}
              />
            }
            px={0}
            mx={10}
            onPress={() => Alert.alert('Google')}
          />
        </View>
      </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginTop: 120,
    marginBottom: 10,
  },
  logo: {height: 200, width: 200, borderRadius: 100},
  inputContainer: {
    marginVertical: 0,
    paddingHorizontal: 50,
    paddingVertical: 25,
  },
  socialLogin: {
    flexDirection: 'row',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  btnView: {
    marginVertical: 10,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  rowBtntext: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: 'black',
    margin: 10,
  },
});

export default Login;
