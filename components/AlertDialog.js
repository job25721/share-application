import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modalbox';

import {Colors, PantoneColor} from '../utils/Colors';
import {Button} from './CustomStyledComponent/Button/CustomButton';
import {CustomText} from './CustomStyledComponent/Text';

const AlertDialog = ({
  title,
  content,
  onConfirm,
  open,
  onClosePress,
  confirmText,
  cancelText,
  hasCancel,
  disabledBtn,
}) => {
  return (
    <Modal
      backdropPressToClose={false}
      swipeToClose={false}
      coverScreen={true}
      isOpen={open}
      style={[
        styles.container,
        content ? null : {height: '18%', justifyContent: 'space-evenly'},
      ]}>
      <CustomText fontWeight="bold" textAlign="center" fontSize={25}>
        {title}
      </CustomText>
      {content ? (
        <View style={styles.contentView}>
          <CustomText textAlign="center">{content}</CustomText>
        </View>
      ) : null}
      {disabledBtn ? null : (
        <View style={styles.btnView}>
          <Button
            text={confirmText ? confirmText : 'ตกลง'}
            onPress={onConfirm}
            color={Colors.white}
            bg={PantoneColor.livingCoral}
          />
          {hasCancel === false ? null : (
            <Button
              text={cancelText ? cancelText : 'ยกเลิก'}
              onPress={onClosePress}
              color={Colors.white}
              bg={PantoneColor.blueDepths}
            />
          )}
        </View>
      )}
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
  contentView: {justifyContent: 'center', flex: 1},
  btnView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default AlertDialog;
