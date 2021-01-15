import React, {useContext} from 'react';
import {View} from 'react-native';
import {CustomText} from '../../CustomStyledComponent/Text';
import Feather from 'react-native-vector-icons/Feather';
import {FormContext} from '../../../pages/NewItem';
import {SET_MODAL} from '../../../utils/form/form-action-type';
import {Button} from '../../CustomStyledComponent/Button/CustomButton';
const PickerInput = () => {
  const {state, dispatch} = useContext(FormContext);
  const {selectedType} = state;
  return (
    <View
      style={{
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <CustomText>
        {selectedType === null ? 'เลือกประเภท' : selectedType}
      </CustomText>
      <View
        style={{
          position: 'absolute',
          right: 0,
        }}>
        <Button
          onPress={() => {
            dispatch({
              type: SET_MODAL,
              payload: true,
            });
          }}>
          <Feather name="chevron-down" size={20} />
        </Button>
      </View>
    </View>
  );
};

export default PickerInput;
