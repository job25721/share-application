import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modalbox';

import {Colors, PantoneColor} from '../utils/Colors';
import {Button} from './CustomStyledComponent/Button/CustomButton';
import {CustomText} from './CustomStyledComponent/Text';

const AlertDialog = ({title, content, onConfirm, open, onClosePress}) => {
  useEffect(() => {
    console.log(open);
  }, [open]);

  return (
    <Modal
      backdropPressToClose={false}
      swipeToClose={false}
      coverScreen={true}
      isOpen={open}
      style={styles.container}>
      <CustomText fontWeight="bold" textAlign="center" fontSize={25}>
        {title}
      </CustomText>
      <View style={{justifyContent: 'center', flex: 1}}>
        <CustomText textAlign="center">{content}</CustomText>
      </View>

      <View style={styles.btnView}>
        <Button
          text="ตกลง"
          onPress={onConfirm}
          color={Colors.white}
          bg={PantoneColor.livingCoral}
        />
        <Button
          text="ยกเลิก"
          onPress={onClosePress}
          color={Colors.white}
          bg={PantoneColor.blueDepths}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '25%',
    width: '90%',
    borderRadius: 20,
    padding: 20,
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default AlertDialog;
