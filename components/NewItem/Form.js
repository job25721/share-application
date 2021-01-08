/* eslint-disable react-native/no-inline-styles */
import React, {createContext, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, TextInput, View} from 'react-native';

import {Button} from '../CustomStyledComponent/Button/CustomButton';
import {Input} from '../CustomStyledComponent/Input/CustomInput';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {Colors} from '../../utils/Colors';
import UploadBtn from './UploadBtn';
import FormTag from './Tag';
import TypePicer from './TypePicker';
import {CustomText} from '../CustomStyledComponent/Text';
import ImgPreview from './ImgPreview';

export const TagContext = createContext({});

const NewItemfForm = () => {
  const [tags, setTag] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const addTag = () => {
    if (tagInput !== '') {
      setTag([...tags, {name: tagInput, id: Date.now()}]);
      setTagInput('');
    }
  };
  return (
    <ScrollView style={styles.container}>
      <ImgPreview />
      <View style={styles.uploadSection}>
        <UploadBtn />
      </View>

      <View style={{paddingHorizontal: 20}}>
        <Input shadow="sm" focus rounded placeholder="ชื่อ" />

        <TypePicer />

        <TagContext.Provider value={{tags, setTag}}>
          <View style={styles.tagSection}>
            {tags.map((item) => (
              <FormTag name={item.name} id={item.id} key={item.id} />
            ))}
            {tags.length < 5 ? (
              <View style={{flexDirection: 'row'}}>
                <Button px={0}>
                  <FeatherIcon name="plus" color={Colors.black} size={15} />
                </Button>
                <TextInput
                  onChangeText={(val) => setTagInput(val)}
                  maxLength={10}
                  value={tagInput}
                  onSubmitEditing={addTag}
                  placeholder="เพิ่มแท้กใหม่"
                />
              </View>
            ) : null}
          </View>
        </TagContext.Provider>

        <Input
          textAlignVertical="top"
          placeholder="รายละเอียด"
          height="20%"
          shadow="md"
          multiline
        />
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
        }}>
        <Button
          rounded
          onPress={() => alert('hello world')}
          bg={Colors._indigo_500}
          text="แชร์!"
          fontSize={24}
          color={Colors.white}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    // padding: 10,
  },
  uploadSection: {
    alignItems: 'center',
  },
  tagSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
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
