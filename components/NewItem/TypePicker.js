/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';

import {Picker} from '@react-native-picker/picker';
import {Colors} from '../../utils/Colors';
import {FormContext} from '../../pages/NewItem';
import {SET_PICKER_TYPE} from '../../utils/form/form-action-type';
import {Platform} from 'react-native';

const TypePicker = () => {
  const {state, dispatch} = useContext(FormContext);
  const {pickerItems, selectedType} = state;
  return (
    <Picker
      selectedValue={selectedType}
      onValueChange={(val) => {
        console.log(val);
        dispatch({
          type: SET_PICKER_TYPE,
          payload: val,
        });
      }}
      style={Platform.OS === 'ios' ? {height: 150} : null}
      mode="dropdown">
      <Picker.Item label="เลือกประเภท" value={null} color={Colors.grey} />
      {pickerItems.map((item) => (
        <Picker.Item label={item.label} value={item.value} key={item.key} />
      ))}
    </Picker>
  );
};

export default TypePicker;
