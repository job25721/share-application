/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Colors, PantoneColor} from '../../utils/Colors';
import {Button} from '../CustomStyledComponent/Button/CustomButton';
import {CustomText} from '../CustomStyledComponent/Text';
import FeatherIcon from 'react-native-vector-icons/Feather';
import ImageCropPicker from 'react-native-image-crop-picker';
const CameraBtn = () => {
  const [userImg, setUserImg] = useState(null);
  const uploadPhoto = async () => {
    try {
      const res = await ImageCropPicker.openPicker({
        cropping: true,
        cropperCircleOverlay: true,
      });
      console.log(res);
      setUserImg(res.path);
    } catch (error) {
      console.log(error);
    }
  };

  const openCamera = async () => {
    try {
      const res = await ImageCropPicker.openCamera({
        cropping: true,
        cropperCircleOverlay: true,
      });
      setUserImg(res.path);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <View style={[btnStyles.uploadStyle, userImg ? null : {padding: 30}]}>
        {userImg ? (
          <Image
            style={{borderRadius: 100, height: 140, width: 140}}
            source={{uri: userImg}}
          />
        ) : (
          <View style={btnStyles.btnFlex}>
            <FeatherIcon name="user" size={70} />
          </View>
        )}
        <View style={{position: 'absolute', bottom: -5, right: -5}}>
          <Button
            onPress={uploadPhoto}
            bg={PantoneColor.blueDepths}
            px={10}
            py={10}
            rounded>
            <FeatherIcon name="upload" size={18} color={Colors.white} />
          </Button>
        </View>
        <View style={{position: 'absolute', top: -5, left: -5}}>
          <Button
            onPress={openCamera}
            bg={PantoneColor.blueDepths}
            px={10}
            py={10}
            rounded>
            <FeatherIcon name="camera" size={18} color={Colors.white} />
          </Button>
        </View>
      </View>
    </>
  );
};

const btnStyles = StyleSheet.create({
  btnFlex: {
    alignItems: 'center',
  },
  uploadStyle: {
    backgroundColor: Colors.white,
    borderRadius: 100,
  },
});

export default CameraBtn;
