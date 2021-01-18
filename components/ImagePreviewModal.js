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
          source={{uri}}
          style={{height: '100%', width: '100%', borderRadius: 20}}
        />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  previewModal: {
    height: '50%',
    width: '95%',
    borderRadius: 20,
    alignItems: 'center',
  },
});

export default ImagePreviewModal;
