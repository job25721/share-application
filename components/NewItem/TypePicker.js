/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Platform, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {Picker} from '@react-native-picker/picker';
import {Colors} from '../../utils/Colors';
import FeatherIcon from 'react-native-vector-icons/Feather';

const TypePicer = () => {
  const items = [
    {label: 'สวัสดีค้าบบ', value: 1, key: 1},
    {label: 'ท่านสมาชิก', value: 2, key: 2},
    {label: 'ชมรมคนชอบ หี', value: 3, key: 3},
  ];

  const [selectedType, setSelected] = useState(null);

  return Platform.OS === 'ios' ? (
    <View style={{padding: 20}}>
      <RNPickerSelect
        onValueChange={(value) => setSelected(value)}
        value={selectedType}
        placeholder={{label: 'เลือกประเภท', value: null, key: 'type'}}
        Icon={() => <FeatherIcon name="chevron-down" />}
        items={items}
      />
    </View>
  ) : (
    <View style={{paddingHorizontal: 10}}>
      <Picker
        selectedValue={selectedType}
        onValueChange={(val) => setSelected(val)}
        mode="dropdown">
        <Picker.Item label="เลือกประเภท" value={null} color={Colors.grey} />
        {items.map((item) => (
          <Picker.Item label={item.label} value={item.value} key={item.key} />
        ))}
      </Picker>
    </View>
  );
};

export default TypePicer;
