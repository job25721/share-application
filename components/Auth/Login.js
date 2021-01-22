/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import {Button} from '../CustomStyledComponent/Button/CustomButton';
import {Colors, PantoneColor} from '../../utils/Colors';
import {Input} from '../CustomStyledComponent/Input/CustomInput';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {CustomText} from '../CustomStyledComponent/Text';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5Pro';
import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@apollo/client';
import {userLogin} from '../../graphql/mutation/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertDialog from '../AlertDialog';
import {useDispatch} from 'react-redux';
import {SET_TOKEN} from '../../store/actions/user';
export default () => {
  const {navigate} = useNavigation();

  const [username, setUsername] = useState('guy');
  const [password, setPassword] = useState('1234');
  const [loading, setLoading] = useState(false);
  const [login] = useMutation(userLogin);
  const dispatch = useDispatch();
  const Login = async () => {
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
        dispatch({type: SET_TOKEN, payload: data.login});
        await AsyncStorage.setItem('userToken', data.login);

        navigate('Tab');
      } catch (error) {
        Alert.alert(error.message);
      }
    } else {
      Alert.alert('Please fill');
    }
  };

  return (
    <>
      <AlertDialog open={loading} disabledBtn title="กรุณารอสักครู่...." />
      <View
        style={{
          alignItems: 'center',
          marginTop: 120,
          marginBottom: 10,
        }}>
        <Image
          style={{height: 200, width: 200, borderRadius: 100}}
          source={require('../../assets/img/realLogo.png')}
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
      <View
        style={{marginVertical: 0, paddingHorizontal: 50, paddingVertical: 25}}>
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
          onPress={Login}
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
