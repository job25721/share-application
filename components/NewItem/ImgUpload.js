import React, {useContext} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import {SliderBox} from 'react-native-image-slider-box';
import {FormContext} from '../../pages/NewItem';
import {ADD_IMAGE, REMOVE_IMAGE} from '../../utils/form/form-action-type';
import CameraBtn from './CameraBtn';
import UploadBtn from './UploadBtn';

const ImgUpload = () => {
  const {state, dispatch} = useContext(FormContext);
  const {images} = state;
  const uploadPhoto = async () => {
    try {
      const uploaded = await ImageCropPicker.openPicker({
        multiple: true,
      });
      dispatch({
        type: ADD_IMAGE,
        payload: uploaded.map((img) => img.path),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const openCamera = async () => {
    try {
      const snap = await ImageCropPicker.openCamera({
        cropping: true,
      });
      dispatch({
        type: ADD_IMAGE,
        payload: [snap.path],
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {images.length > 0 ? (
        <SliderBox
          onCurrentImagePressed={(idx) => {
            Alert.alert('Remove photo', 'ต้องการลบรูปนี้', [
              {
                text: 'OK',
                onPress: () => {
                  dispatch({
                    type: REMOVE_IMAGE,
                    payload: idx,
                  });
                },
              },
              {
                text: 'Cancel',
              },
            ]);
          }}
          sliderBoxHeight={300}
          images={images}
        />
      ) : null}

      {images.length < 6 ? (
        <View style={styles.uploadSection}>
          <UploadBtn onPress={uploadPhoto} />
          <CameraBtn onPress={openCamera} />
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  uploadSection: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
export default ImgUpload;
