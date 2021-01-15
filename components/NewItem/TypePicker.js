/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';

import {Picker} from '@react-native-picker/picker';
import {Colors} from '../../utils/Colors';
import {PickerContext} from './Form';
const TypePicker = () => {
  const items = [
    {label: 'สวัสดีค้าบบ', value: 1, key: 1},
    {label: 'ท่านสมาชิก', value: 2, key: 2},
  ];
  const {selectedType, setSelected} = useContext(PickerContext);

  return (
    <>
      <Picker
        selectedValue={selectedType}
        onValueChange={(val) => setSelected(val)}
        style={{height: 150}}
        mode="dialog">
        <Picker.Item label="เลือกประเภท" value={null} color={Colors.grey} />
        {items.map((item) => (
          <Picker.Item label={item.label} value={item.value} key={item.key} />
        ))}
      </Picker>
    </>
  );
};

export default TypePicker;
