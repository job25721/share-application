/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import Slider from '@react-native-community/slider';
import Modal from 'react-native-modalbox';

import {Colors, PantoneColor} from '../../utils/Colors';
import {Button, CustomText, Input} from '../custom-components';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import {useSelector} from 'react-redux';

import {RootState, useDispatch} from '../../store';

interface RequestModalProps {
  name: string;
  isOpen: boolean;
  onClosePress?: any;
  onSubmit?: any;
}

const RequestModal: React.FC<RequestModalProps> = (props) => {
  const {name, isOpen, onClosePress, onSubmit} = props;
  const {reason, wantedRate} = useSelector((state: RootState) => ({
    reason: state.request.reason,
    wantedRate: state.request.wantedRate,
  }));

  const dispatch = useDispatch();

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
            height={100}
            placeholder="กรอกเหตุผล..."
            value={reason}
            onChangeText={(value: string) =>
              dispatch({type: 'SET_REASON', payload: value})
            }
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
                minimumValue={1}
                maximumValue={10}
                step={1}
                minimumTrackTintColor={PantoneColor.livingCoral}
                thumbTintColor={PantoneColor.blueDepths}
                value={wantedRate}
                style={{width: '90%'}}
                onValueChange={(value: number) =>
                  dispatch({type: 'SET_WANTED_RATE', payload: value})
                }
              />
              <CustomText>{wantedRate}</CustomText>
            </View>
          </View>
        </View>
        <View style={styles.submitBtnView}>
          <Button
            bg={
              reason !== ''
                ? PantoneColor.livingCoral
                : PantoneColor.veryLivingCoral
            }
            color={Colors.white}
            text="ส่งคำขอ"
            onPress={reason !== '' ? onSubmit : undefined}
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
    height: '55%',
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
