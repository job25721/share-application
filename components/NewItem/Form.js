/* eslint-disable react-native/no-inline-styles */
import React, {createContext, useState} from 'react';
import {
  FlatList,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import {Button} from '../CustomStyledComponent/Button/CustomButton';
import {Input} from '../CustomStyledComponent/Input/CustomInput';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {Colors, PantoneColor} from '../../utils/Colors';
import UploadBtn from './UploadBtn';
import FormTag from './Tag';
import TypePicker from './TypePicker';
import {CustomText} from '../CustomStyledComponent/Text';
import ImgPreview from './ImgPreview';
import {KeyboardAvoidingView, Alert} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import ImagePicker from 'react-native-image-crop-picker';
import CameraBtn from './CameraBtn';
export const TagContext = createContext({});

const NewItemfForm = () => {
  const [images, setImages] = useState([
    // require('../../assets/img/cat.jpg'),
    // require('../../assets/img/bag.jpg'),
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
      <CustomText
        color={PantoneColor.blueDepths}
        textAlign="center"
        fontWeight="bold"
        fontSize={40}>
        เพิ่มของชิ้นใหม่
      </CustomText>
      <ScrollView>
        {images.length > 0 ? (
          <SliderBox
            onCurrentImagePressed={(idx) => {
              Alert.alert('Remove photo', 'ต้องการลบรูปนี้', [
                {
                  text: 'OK',
                  onPress: () => {
                    const img = images.filter((_, i) => i !== idx);
                    setImages(img);
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

        <View style={{paddingHorizontal: 20, marginTop: 10}}>
          <CustomText fontSize={20} fontWeight="bold">
            รายละเอียดทั่วไป <CustomText color={Colors._red_500}>*</CustomText>
          </CustomText>
          <View
            style={{
              padding: 20,
              backgroundColor: Colors._gray_500,
              borderRadius: 20,
              shadowColor: Colors.black,
              shadowOpacity: 0.1,
            }}>
            <CustomText>ชื่อสิ่งของ</CustomText>
            <Input
              maxLength={20}
              focus
              rounded
              placeholder="สูงสุด 20 ตัวอักษร"
            />
            <CustomText>ประเภท</CustomText>
            <TypePicker />
            <CustomText>รายละเอียด</CustomText>
            <Input
              textAlignVertical="top"
              placeholder="รายละเอียด"
              height={150}
              multiline
            />

            <TagContext.Provider value={{tags, setTag}}>
              <CustomText>แท็ก</CustomText>
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
                      placeholder="เพิ่มแท็กใหม่"
                    />
                  </View>
                ) : null}
              </View>
            </TagContext.Provider>
          </View>

          <Button
            rounded
            onPress={() => alert('hello world')}
            bg={PantoneColor.livingCoral}
            text="แชร์!"
            fontSize={24}
            color={Colors.white}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
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
