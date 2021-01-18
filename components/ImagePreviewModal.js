import React from 'react';
import Modal from 'react-native-modalbox';

import {Image, StyleSheet} from 'react-native';

const ImagePreviewModal = ({open, onClosed, uri}) => {
  return (
    <>
      <Modal
        onClosed={onClosed}
        position="center"
        style={styles.previewModal}
        coverScreen={true}
        isOpen={uri ? true : false}>
        <Image
          resizeMode="cover"
          source={{uri}}
          style={{borderRadius: 20, height: '100%', width: '100%'}}
        />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  previewModal: {
    width: '90%',
    height: '50%',
    borderRadius: 20,
    alignItems: 'center',
  },
});

export default ImagePreviewModal;
