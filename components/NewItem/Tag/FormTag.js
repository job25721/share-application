import React, {useContext, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Button} from '../../CustomStyledComponent/Button/CustomButton';
import Feather from 'react-native-vector-icons/Feather';
import {FormContext} from '../../../pages/NewItem';
import {Colors} from '../../../utils/Colors';
import {ADD_TAG} from '../../../utils/form/form-action-type';
import Tag from './Tag';
import {CustomText} from '../../CustomStyledComponent/Text';
const FormTag = () => {
  const {state, dispatch} = useContext(FormContext);
  const {tags} = state;
  const [tagInput, setTagInput] = useState('');
  return (
    <>
      <CustomText>แท็ก</CustomText>
      <View style={styles.tagSection}>
        {tags.map((item) => (
          <Tag name={item.name} id={item.id} key={item.id} />
        ))}
        {tags.length < 4 ? (
          <View style={{flexDirection: 'row'}}>
            <Button px={0}>
              <Feather name="plus" color={Colors.black} size={15} />
            </Button>
            <TextInput
              onChangeText={(val) => setTagInput(val)}
              maxLength={10}
              value={tagInput}
              onSubmitEditing={() => {
                if (tagInput !== '') {
                  dispatch({
                    type: ADD_TAG,
                    payload: {name: tagInput, id: Date.now()},
                  });
                  setTagInput('');
                }
              }}
              blurOnSubmit={false}
              placeholder="เพิ่มแท็กใหม่"
            />
          </View>
        ) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  tagSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'center',
  },
});

export default FormTag;
