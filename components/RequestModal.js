import React, {useContext, useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Modal from 'react-native-modalbox';
import {ModalContext} from '../pages/Detail';
import {Colors, PantoneColor} from '../utils/Colors';
import {Button} from './CustomStyledComponent/Button/CustomButton';
import Feather from 'react-native-vector-icons/Feather';
import {Input} from './CustomStyledComponent/Input/CustomInput';
import {CustomText} from './CustomStyledComponent/Text';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import AlertDialog from './AlertDialog';

import {useNavigation} from '@react-navigation/native';

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
        //   backdropPressToClose={false}
        backdropColor={PantoneColor.blueDepths}
        swipeToClose={false}
        position={Platform.OS === 'ios' ? 'center' : 'top'}>
        <CustomText textAlign="center" fontSize={25}>
          {name}
        </CustomText>

        <View style={styles.form}>
          <View style={{flexDirection: 'row'}}>
            <CustomText>ระบุเหตุผลที่ต้องการของชิ้นนี้</CustomText>
            <View>
              <CustomText color={Colors._red_500} fontSize={15}>
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
            <Slider
              minimumValue={0}
              maximumValue={10}
              step={1}
              minimumTrackTintColor={PantoneColor.livingCoral}
              thumbTintColor={PantoneColor.blueDepths}
              value={wantedRate}
              onValueChange={(val) => setRate(val)}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <View>
              <CustomText>0</CustomText>
            </View>
            <View style={{position: 'absolute', right: 150}}>
              <CustomText>5</CustomText>
            </View>
            <View style={{position: 'absolute', right: 0}}>
              <CustomText>10</CustomText>
            </View>
          </View>
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
  },
  submitBtnView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1,
  },
});

export default RequestModal;
