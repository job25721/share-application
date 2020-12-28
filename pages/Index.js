import React from 'react';
import {SafeAreaView, View, StyleSheet, Alert, ScrollView} from 'react-native';
import {Button} from '../components/CustomStyledComponent/Button/CustomButton';
import {DismissKeyboard} from '../components/DismissKeyboard';
import {Input} from '../components/CustomStyledComponent/Input/CustomInput';
import {CustomText} from '../components/CustomStyledComponent/Text';
import {Card} from '../components/CustomStyledComponent/Card/Card';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import {Colors} from '../components/CustomStyledComponent/Colors';

export default (props) => {
  return (
    <DismissKeyboard>
      <ScrollView style={{padding: 20}}>
        <CustomText fontSize={30} textAlign="center">
          Icon
        </CustomText>
        <Icon.Button
          onPress={() => Alert.alert('Login')}
          borderRadius={10}
          name="facebook"
          size={35}>
          <CustomText fontSize={25} color={Colors.white}>
            Login with Facebook
          </CustomText>
        </Icon.Button>
        <SafeAreaView style={styles.container}>
          <View>
            <Input placeholder="Username" />
            <Input type="password" placeholder="Password" />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
            <Button
              onPress={() => Alert.alert('hello world')}
              bg="_indigo_600"
              text="Login"
              fontSize={20}
              color="white"
            />
          </View>
          {[require('../assets/img/dang.jpg'), ''].map((item) => (
            <Card key={item} img={item}>
              <CustomText type="subheader">อาจารย์แดง กีตาร์</CustomText>
              <CustomText spacing={10}>กูมีสองหี ดับเบิ้ลหี</CustomText>
              <CustomText spacing={5}>
                มึงด่ากูมึงเกลียดกู มึงเป็นอรหันต์
              </CustomText>
              <View style={{alignSelf: 'flex-start'}}>
                {/* <Button type="info" text="Like" /> */}
              </View>
            </Card>
          ))}
        </SafeAreaView>
      </ScrollView>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  SubLogo: {
    flexDirection: 'row',
    marginTop: 20,
  },
  CssFacebook: {
    marginRight: 15,
  },
  TextLabel: {
    fontSize: 18,
  },
  Container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  LoGo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#3844EE',
    marginBottom: 60,
  },
  InputText: {
    borderRadius: 25,
    fontSize: 16,
    height: 50,
    width: 250,
    borderColor: '#E1E1E1',
    borderWidth: 1,
    marginBottom: '5%',
  },
  LoginBtn: {
    width: '30%',
    backgroundColor: '#6370FF',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  LoginText: {
    color: 'white',
    fontSize: 22,
  },
  CreateAccount: {
    color: '#5A62D4',
    fontSize: 16,
  },
  Continue: {
    color: '#B5B5B5',
  },
});
