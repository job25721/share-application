import React from 'react';
import AppABar from '../components/Appbar';
import {CustomText} from '../components/CustomStyledComponent/Text';
import {View, Image, StyleSheet, TextInput, Alert} from 'react-native';
import {Input} from '../components/CustomStyledComponent/Input/CustomInput';
import {MultipleInput} from '../components/CustomStyledComponent/Input/CustomMultipleInput';
import {Button} from '../components/CustomStyledComponent/Button/CustomButton';
import {Colors} from '../components/CustomStyledComponent/Colors';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default (props) => {
  return (
    <AppABar navigate={props.navigation.navigate}>
      <View style={style.container}>
        <View style={{marginBottom: 10}}>
          <Image source={require('../assets/img/upload.png')} />
          <CustomText fontSize={16} fontWeight="bold">
            Upload Photo
          </CustomText>
        </View>
        <View>
          <Input focus rounded width={350} placeholder="ชื่อ" />
        </View>
        <View>
          <Input focus rounded width={350} placeholder="ประเเภท" />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 10,
            marginBottom: 50,
          }}>
          <FeatherIcon.Button
            borderRadius={30}
            bg={Colors._indigo_500}
            name="x-circle"
            size={30}>
            <CustomText fontSize={18} color={Colors.white}>
              เพิ่มเเท็ก
            </CustomText>
          </FeatherIcon.Button>
          <Button
            rounded
            text={<FeatherIcon name="plus-circle" size={30} />}
            color={Colors._indigo_500}
          />
        </View>
        <View>
          <Input focus rounded width={350} placeholder="เพิ่มเเท็ก" />
        </View>
        <View>
          <Input focus rounded width={350} placeholder="เพิ่มสถานที่" />
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginTop: 20,
          }}>
          <Button
            rounded
            onPress={() => Alert.alert('hello world')}
            bg={Colors._indigo_500}
            text="แชร์!"
            fontSize={24}
            color={Colors.white}
          />
        </View>
      </View>
    </AppABar>
  );
};

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});
