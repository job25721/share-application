import React, {useContext, useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Modal from 'react-native-modalbox';

import {Colors, PantoneColor} from '../utils/Colors';
import {Button} from './CustomStyledComponent/Button/CustomButton';

import {Input} from './CustomStyledComponent/Input/CustomInput';
import {CustomText} from './CustomStyledComponent/Text';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';

const RequestModal = ({name, isOpen, onClosePress, onSubmit}) => {
  const [wantedRate, setRate] = useState(0);

  useEffect(() => {
    if (Platform.OS === 'android') {
      AndroidKeyboardAdjust.setAdjustNothing();

      return () => {
        AndroidKeyboardAdjust.setAdjustResize();
      };
    }
  }, []);
  return (
    <>
      <Modal
        style={[
          styles.container,
          Platform.OS === 'android' ? {marginTop: '15%'} : null,
        ]}
        isOpen={isOpen}
        backdropPressToClose={false}
        backdropColor={PantoneColor.blueDepths}
        swipeToClose={false}
        position={Platform.OS === 'ios' ? 'center' : 'top'}>
        <CustomText textAlign="center" fontSize={20}>
          {name}
        </CustomText>

        <View style={styles.form}>
          <View style={{flexDirection: 'row'}}>
            <CustomText fontSize={16}>
              ระบุเหตุผลที่ต้องการของชิ้นนี้
            </CustomText>
            <View>
              <CustomText color={Colors._red_500} fontSize={13}>
                {' '}
                *จำเป็น
              </CustomText>
            </View>
          </View>
          <Input
            textAlignVertical="top"
            height="40%"
            placeholder="กรอกเหตุผล..."
            multiline
            backgroundColor={Colors._gray_900}
          />
          <View style={{marginTop: 10}}>
            <CustomText>ความต้องการ</CustomText>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Slider
                minimumValue={0}
                maximumValue={10}
                step={1}
                minimumTrackTintColor={PantoneColor.livingCoral}
                thumbTintColor={PantoneColor.blueDepths}
                value={wantedRate}
                style={{width: '90%'}}
                onValueChange={setRate}
              />
              <CustomText>{wantedRate}</CustomText>
            </View>
          </View>
          {/* <View style={{flexDirection: 'row'}}>
            <View>
              <CustomText>0</CustomText>
            </View>
            <View style={{position: 'absolute', right: 150}}>
              <CustomText>5</CustomText>
            </View>
            <View style={{position: 'absolute', right: 0}}>
              <CustomText>10</CustomText>
            </View>
          </View> */}
        </View>
        <View style={styles.submitBtnView}>
          <Button
            bg={PantoneColor.livingCoral}
            color={Colors.white}
            text="ส่งคำขอ"
            onPress={onSubmit}
          />
          <Button
            bg={PantoneColor.blueDepths}
            color={Colors.white}
            onPress={onClosePress}
            text="ยกเลิก"
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '85%',
    height: '50%',
    borderRadius: 20,
    padding: 20,
  },
  form: {
    marginVertical: 10,
    flex: 1,
  },
  submitBtnView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default RequestModal;
