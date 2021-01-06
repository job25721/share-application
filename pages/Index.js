/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import {Button} from '../components/CustomStyledComponent/Button/CustomButton';
import {DismissKeyboard} from '../components/CustomStyledComponent/DismissKeyboard';
import {Input} from '../components/CustomStyledComponent/Input/CustomInput';
import {CustomText} from '../components/CustomStyledComponent/Text';
import {Card} from '../components/Home/Card';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import {Colors} from '../utils/Colors';
import NavigationBar from '../components/CustomStyledComponent/NavigationBar';

export default (props) => {
  return (
    <DismissKeyboard>
      <NavigationBar navigate={props.navigation.navigate}>
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

          <View>
            <Input focus placeholder="Username" />
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
          {[require('../assets/img/dang.jpg'), ''].map((item, i) => (
            <Card key={i} img={item}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                  }}
                  source={require('../assets/img/dang.jpg')}
                />
                <View style={{paddingHorizontal: 10}}>
                  <CustomText fontSize={20}>อาจารย์แดง กีตาร์</CustomText>
                </View>
              </View>

              <View style={{alignSelf: 'flex-start'}}></View>
            </Card>
          ))}
        </ScrollView>
      </NavigationBar>
    </DismissKeyboard>
  );
};
