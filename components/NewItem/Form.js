/* eslint-disable react-native/no-inline-styles */
import React, {createContext, useState} from 'react';
import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import {Button} from '../CustomStyledComponent/Button/CustomButton';
import {Input} from '../CustomStyledComponent/Input/CustomInput';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {Colors} from '../../utils/Colors';
import UploadBtn from './UploadBtn';
import FormTag from './Tag';
import TypePicer from './TypePicker';
import {CustomText} from '../CustomStyledComponent/Text';
import ImgPreview from './ImgPreview';
import {KeyboardAvoidingView} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import ImagePicker from 'react-native-image-crop-picker';
import CameraBtn from './CameraBtn';
export const TagContext = createContext({});

const NewItemfForm = () => {
  const [images, setImages] = useState([
    require('../../assets/img/cat.jpg'),
    require('../../assets/img/bag.jpg'),
  ]);
  const [tags, setTag] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const addTag = () => {
    if (tagInput !== '') {
      setTag([...tags, {name: tagInput, id: Date.now()}]);
      setTagInput('');
    }
  };

  const uploadPhoto = async () => {
    try {
      const uploaded = await ImagePicker.openPicker({
        multiple: true,
      });
      const mapImages = uploaded.map((img) => img.path);
      setImages([...images, ...mapImages]);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const openCamera = async () => {
    try {
      const snap = await ImagePicker.openCamera({
        cropping: true,
      });
      setImages([...images, snap.path]);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : ''}>
      <ScrollView>
        {images.length > 0 ? (
          <SliderBox
            onCurrentImagePressed={(idx) => {
              // const img = images.filter((_, i) => i !== idx);
              // setImages(img);
            }}
            on
            sliderBoxHeight={400}
            images={images}
          />
        ) : null}
        {/* <ScrollView style={{flex: 1}}> */}
        {images.length < 6 ? (
          <View style={styles.uploadSection}>
            <UploadBtn onPress={uploadPhoto} />
            <CameraBtn onPress={openCamera} />
          </View>
        ) : null}

        <View style={{paddingHorizontal: 20}}>
          <Input shadow="sm" focus rounded placeholder="ชื่อ" />

          <TypePicer />

          <TagContext.Provider value={{tags, setTag}}>
            <View style={styles.tagSection}>
              {tags.map((item) => (
                <FormTag name={item.name} id={item.id} key={item.id} />
              ))}
              {tags.length < 4 ? (
                <View style={{flexDirection: 'row'}}>
                  <Button px={0}>
                    <FeatherIcon name="plus" color={Colors.black} size={15} />
                  </Button>
                  <TextInput
                    onChangeText={(val) => setTagInput(val)}
                    maxLength={10}
                    value={tagInput}
                    onSubmitEditing={addTag}
                    blurOnSubmit={false}
                    placeholder="เพิ่มแท้กใหม่"
                  />
                </View>
              ) : null}
            </View>
          </TagContext.Provider>

          <Input
            textAlignVertical="top"
            placeholder="รายละเอียด"
            height={150}
            shadow="md"
            multiline
          />
          <Button
            rounded
            onPress={() => alert('hello world')}
            bg={Colors._indigo_500}
            text="แชร์!"
            fontSize={24}
            color={Colors.white}
          />
        </View>
        {/* </ScrollView> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    // padding: 10,
  },
  uploadSection: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  tagSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'center',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default NewItemfForm;
