import React, {useContext} from 'react';
import {CustomText} from '../CustomStyledComponent/Text';
import TypePicker from './TypePicker';
import Modal from 'react-native-modalbox';
import {ModalContext} from '../../pages/NewItem';

const TypePickerModal = () => {
  const {modalOpen, setModalOpen} = useContext(ModalContext);
  return (
    <Modal
      position="bottom"
      style={{
        borderRadius: 40,
        padding: 10,
        height: '30%',
        justifyContent: 'center',
      }}
      onClosed={() => setModalOpen(false)}
      isOpen={modalOpen}>
      <CustomText textAlign="center" fontSize={30}>
        เลือกประเภท
      </CustomText>
      <TypePicker />
    </Modal>
  );
};

export default TypePickerModal;
