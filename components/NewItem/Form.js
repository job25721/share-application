/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {Platform, ScrollView, StyleSheet, View} from 'react-native';

import {Button} from '../CustomStyledComponent/Button/CustomButton';
import {Input} from '../CustomStyledComponent/Input/CustomInput';
import {Colors, PantoneColor} from '../../utils/Colors';
import FormTag from './Tag/FormTag';
import TypePicker from './TypePicker';
import {CustomText} from '../CustomStyledComponent/Text';
import {KeyboardAvoidingView} from 'react-native';

import ImgUpload from './ImgUpload';
import PickerInput from './TypePickerIOS/PickerInput';
import {FormContext} from '../../pages/NewItem';
import {
  SET_DESCRIPTION,
  SET_ITEM_NAME,
} from '../../utils/form/form-action-type';
const NewItemForm = () => {
  const {state, dispatch} = useContext(FormContext);
  const {itemName, description} = state;
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : ''}>
      <CustomText
        color={PantoneColor.blueDepths}
        textAlign="center"
        fontWeight="bold"
        fontSize={40}>
        เพิ่มของชิ้นใหม่
      </CustomText>
      <ScrollView>
        <ImgUpload />
        <View style={{paddingHorizontal: 20, marginTop: 10}}>
          <CustomText fontSize={20} fontWeight="bold">
            รายละเอียดทั่วไป <CustomText color={Colors._red_500}>*</CustomText>
          </CustomText>
          <View
            style={{
              padding: 20,
              backgroundColor: Colors._gray_500,
              borderRadius: 20,
              shadowColor: Colors.black,
              shadowOpacity: 0.1,
            }}>
            <CustomText>ชื่อสิ่งของ</CustomText>
            <Input
              maxLength={20}
              focus
              value={itemName}
              onChangeText={(val) =>
                dispatch({type: SET_ITEM_NAME, payload: val})
              }
              rounded
              placeholder="สูงสุด 20 ตัวอักษร"
            />

            <CustomText>ประเภท</CustomText>
            {Platform.OS === 'ios' ? <PickerInput /> : <TypePicker />}

            <CustomText>รายละเอียด</CustomText>
            <Input
              textAlignVertical="top"
              placeholder="รายละเอียด"
              height={150}
              value={description}
              onChangeText={(val) =>
                dispatch({type: SET_DESCRIPTION, payload: val})
              }
              multiline
            />
            <FormTag />
          </View>

          <Button
            rounded
            onPress={() => alert('hello world')}
            bg={PantoneColor.livingCoral}
            text="แชร์!"
            fontSize={24}
            color={Colors.white}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  uploadSection: {
    justifyContent: 'center',
    flexDirection: 'row',
  },

  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default NewItemForm;
