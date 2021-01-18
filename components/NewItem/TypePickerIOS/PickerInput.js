import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {CustomText} from '../../CustomStyledComponent/Text';
import Feather from 'react-native-vector-icons/Feather';
import {FormContext} from '../../../pages/NewItem';
import {SET_MODAL} from '../../../utils/form/form-action-type';

const PickerInput = () => {
  const {state, dispatch} = useContext(FormContext);
  const {selectedType} = state;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        dispatch({
          type: SET_MODAL,
          payload: true,
        });
      }}>
      <CustomText color={selectedType === null ? '#858283' : '#000'}>
        {selectedType === null ? 'เลือกประเภท' : selectedType}
      </CustomText>
      <View style={styles.icon}>
        <Feather name="chevron-down" size={20} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    right: 0,
    paddingHorizontal: 20,
  },
});

export default PickerInput;
