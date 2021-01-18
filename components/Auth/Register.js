import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input} from '../CustomStyledComponent/Input/CustomInput';
import {CustomText} from '../CustomStyledComponent/Text';
import CameraBtn from '../Noti/camera';
import CheckBox from '@react-native-community/checkbox';
import {Colors, PantoneColor} from '../../utils/Colors';
import {Button} from '../CustomStyledComponent/Button/CustomButton';
const Register = () => {
  const [isSelected, setSelection] = useState(false);
  return (
    <>
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
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={styles.checkbox}
          />
          <View style={{margin: 8}}>
            <CustomText>I agree with terms and conditions</CustomText>
          </View>
        </View>
        <CustomText>Is you selected: {isSelected ? '👍' : '👎'}</CustomText>
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
    </>
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
});

export default Register;
