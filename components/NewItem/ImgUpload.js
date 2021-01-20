import React, {useContext, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ImageCropPicker from 'react-native-image-crop-picker';
import {FormContext} from '../../pages/NewItem';
import {ADD_IMAGE, REMOVE_IMAGE} from '../../utils/form/form-action-type';
import {Button} from '../CustomStyledComponent/Button/CustomButton';
import ImagePreviewModal from '../ImagePreviewModal';
import CameraBtn from './CameraBtn';
import UploadBtn from './UploadBtn';
import Feather from 'react-native-vector-icons/Feather';
import {Colors} from '../../utils/Colors';
import AlertDialog from '../AlertDialog';
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
const ImgUpload = () => {
  const {state, dispatch} = useContext(FormContext);
  const {images} = state;
  const [alert, setAlert] = useState(false);
  const [onRemove, setRemove] = useState(null);
  const [previewUri, setPreview] = useState(null);

  const uploadPhoto = async () => {
    try {
      const uploaded = await ImageCropPicker.openPicker({
        // multiple: true,
      });
      // dispatch({
      //   type: ADD_IMAGE,
      //   payload: uploaded.map((img) => img.path),
      // });
      const filename = uploaded.path.substr(
        uploaded.path.lastIndexOf('/') + 1,
        uploaded.path.length,
      );
      await storage().ref(filename).putFile(uploaded.path);
    } catch (error) {
      console.log(error);
    }
  };

  const openCamera = async () => {
    try {
      const snap = await ImageCropPicker.openCamera({
        cropping: true,
      });
      console.log();
      const filename = snap.path.substr(
        snap.path.lastIndexOf('/') + 1,
        snap.path.length,
      );

      await storage().ref(filename).putFile(snap.path);
      // dispatch({
      //   type: ADD_IMAGE,
      //   payload: [snap.path],
      // });
    } catch (error) {
      console.log(error);
    }
  };
  const removeImage = () => {
    if (onRemove !== null) {
      dispatch({
        type: REMOVE_IMAGE,
        payload: onRemove,
      });
    }
  };
  return (
    <>
      <ImagePreviewModal onClosed={() => setPreview(null)} uri={previewUri} />
      <AlertDialog
        title="ต้องการลบรูบภาพนี้"
        open={alert}
        onConfirm={() => {
          removeImage();
          setAlert(false);
        }}
        onClosePress={() => {
          setAlert(false);
          setRemove(null);
        }}
      />
      {images.length > 0 ? (
        <ScrollView horizontal>
          {images.map((img, i) => (
            <View key={i.toString()}>
              <View
                style={{position: 'absolute', zIndex: 1, right: -5, top: -5}}>
                <Button
                  onPress={() => {
                    setAlert(true);
                    setRemove(img);
                  }}
                  px={5}
                  py={5}
                  rounded
                  bg="rgba(0,0,0,0.3)">
                  <Feather color={Colors.white} name="x" size={25} />
                </Button>
              </View>
              <TouchableOpacity onPress={() => setPreview(img)}>
                <Image source={{uri: img}} style={styles.img} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
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
  img: {
    height: 150,
    width: 150,
    margin: 10,
    borderRadius: 15,
  },
});
export default ImgUpload;
