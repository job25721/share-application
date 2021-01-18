/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, Text, SafeAreaView} from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
import {CustomText} from '../components/CustomStyledComponent/Text';
import {Input} from '../components/CustomStyledComponent/Input/CustomInput';
import {Button} from '../components/CustomStyledComponent/Button/CustomButton';
import {Colors, PantoneColor} from '../utils/Colors';
import {ScrollView} from 'react-native-gesture-handler';
import CameraBtn from '../components/Noti/camera';

export default ({navigation}) => {
  const [isSelected, setSelection] = useState(false);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View
          style={{
            marginVertical: 20,
            marginHorizontal: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Button px={0} onPress={() => navigation.navigate('Login')}>
            <CustomText fontSize={22}>Login</CustomText>
          </Button>
          <Button px={0}>
            <CustomText fontSize={28} fontWeight={'bold'}>
              Register
            </CustomText>
          </Button>
        </View>
        <View
          style={{
            marginVertical: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{marginVertical: 10}}>
            <CameraBtn />
          </View>
          <View>
            <CustomText>FirstName</CustomText>
            <Input focus rounded width={250} />
            <CustomText>LastName</CustomText>
            <Input focus rounded width={250} />
            <CustomText>Email</CustomText>
            <Input focus rounded width={250} />
            <CustomText>Password</CustomText>
            <Input focus rounded width={250} />
            <CustomText>Confirm Password</CustomText>
            <Input focus rounded width={250} />
          </View>
          <View style={styles.checkboxContainer}>
            {/* <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={styles.checkbox}
          /> */}
            <Text style={styles.label}>I agree with terms and conditions</Text>
          </View>
          <Text style={{marginBottom: 20}}>
            Is you selected: {isSelected ? '👍' : '👎'}
          </Text>
          <Button
            text="SIGN UP"
            bg={PantoneColor.turkishSea}
            color={Colors.white}
            rounded
            my={10}
          />
          <View style={{marginBottom: 50, marginTop: 20}}>
            <CustomText fontSize={16}>Term of use. Privacy policy</CustomText>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});
