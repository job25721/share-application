import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modalbox';
import {ModalContext} from '../pages/Detail';
import {Colors} from '../utils/Colors';

import {Input} from './CustomStyledComponent/Input/CustomInput';
import {CustomText} from './CustomStyledComponent/Text';

const RequestModal = ({name}) => {
  const {isModalOpen, setModalOpen} = useContext(ModalContext);

  return (
    <Modal
      style={styles.container}
      isOpen={isModalOpen}
      backdropPressToClose={false}
      swipeToClose={false}
      position="center"
      onClosed={() => setModalOpen(false)}>
      <CustomText textAlign="center" fontSize={25}>
        {name}
      </CustomText>
      <View style={styles.reasonForm}>
        <CustomText>ใส่เหตุผลที่ต้องการของชิ้นนี้</CustomText>
        <Input
          textAlignVertical="top"
          height="60%"
          placeholder="กรอกเหตุผล..."
          multiline
          backgroundColor={Colors._gray_900}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '85%',
    height: '50%',
    borderRadius: 20,
    padding: 20,
  },
  reasonForm: {
    marginVertical: 10,
  },
});

export default RequestModal;
