/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, View, StyleSheet, Alert, ScrollView} from 'react-native';
import {Button} from '../components/CustomStyledComponent/Button/CustomButton';
import {DismissKeyboard} from '../components/DismissKeyboard';
import {Input} from '../components/CustomStyledComponent/Input/CustomInput';
import {CustomText} from '../components/CustomStyledComponent/Text';
import {Card} from '../components/CustomStyledComponent/Card/Card';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import {Colors} from '../components/CustomStyledComponent/Colors';
import AppABar from '../components/Appbar';

export default (props) => {
  return (
    <DismissKeyboard>
      <AppABar navigate={props.navigation.navigate}>
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
      </AppABar>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
