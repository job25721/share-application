/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import {Button} from '../CustomStyledComponent/Button/CustomButton';
import {Input} from '../CustomStyledComponent/Input/CustomInput';
import {Colors, PantoneColor} from '../../utils/Colors';
import FormTag from './Tag/FormTag';
import TypePicker from './TypePicker';
import {CustomText} from '../CustomStyledComponent/Text';

import ImgUpload from './ImgUpload';
import PickerInput from './TypePickerIOS/PickerInput';
import {FormContext} from '../../pages/NewItem';
import {
  SET_DESCRIPTION,
  SET_ITEM_NAME,
} from '../../utils/form/form-action-type';
import AlertDialog from '../AlertDialog';
const NewItemForm = () => {
  const {state, dispatch} = useContext(FormContext);
  const [alertMsg, setAlert] = useState(false);
  const {itemName, description} = state;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      style={{flex: 1}}>
      <AlertDialog
        open={alertMsg}
        onClosePress={() => setAlert(false)}
        title="ยืนยันข้อมูล"
        content="ข้อมูลถูกต้องครบถ้วนแล้วใช่หรือไม่"
        confirmText="ใช่"
        cancelText="ไม่ใช่"
      />

      <CustomText
        color={PantoneColor.blueDepths}
        textAlign="center"
        fontWeight="bold"
        fontSize={40}>
        เพิ่มของชิ้นใหม่
      </CustomText>
      <ScrollView>
        <ImgUpload />
        <View style={styles.form}>
          <CustomText fontSize={20} fontWeight="bold">
            รายละเอียดทั่วไป <CustomText color={Colors._red_500}>*</CustomText>
          </CustomText>
          <View style={styles.inputSection}>
            <CustomText>ชื่อสิ่งของ</CustomText>
            <Input
              maxLength={40}
              focus
              value={itemName}
              onChangeText={(val) =>
                dispatch({type: SET_ITEM_NAME, payload: val})
              }
              rounded
              placeholder="สูงสุด 40 ตัวอักษร"
            />

            <CustomText>ประเภท</CustomText>
            {Platform.OS === 'ios' ? <PickerInput /> : <TypePicker />}

            <CustomText>รายละเอียด</CustomText>
            <Input
              textAlignVertical="top"
              placeholder="รายละเอียด"
              height={150}
              value={description}
              focus
              onChangeText={(val) =>
                dispatch({type: SET_DESCRIPTION, payload: val})
              }
              multiline
            />
            <FormTag />
          </View>

          <Button
            rounded
            onPress={() => setAlert(true)}
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
  form: {paddingHorizontal: 20, marginTop: 10},
  inputSection: {
    padding: 20,
    backgroundColor: Colors._gray_500,
    borderRadius: 20,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
  },
});

export default NewItemForm;
