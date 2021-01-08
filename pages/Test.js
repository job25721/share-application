import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import {Button} from '../components/CustomStyledComponent/Button/CustomButton';
import ImagePicker from 'react-native-image-crop-picker';

export default () => {
  const [img, setImg] = useState([]);
  const onUpload = async () => {
    try {
      const image = await ImagePicker.openCamera({
        cropping: true,
      });

      setImg([...img, image.path]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(img);
  }, [img]);
  return (
    <View>
      {img.map((image, i) => (
        <Image key={i} source={{uri: image, width: 300, height: 600}} />
      ))}
      <Button onPress={onUpload} text="Click" />
    </View>
  );
};
