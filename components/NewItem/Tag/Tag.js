import React, {useContext} from 'react';
import {Alert, StyleSheet, TouchableOpacity} from 'react-native';
import {FormContext} from '../../../pages/NewItem';
import {PantoneColor} from '../../../utils/Colors';
import {REMOVE_TAG} from '../../../utils/form/form-action-type';
import {CustomText} from '../../CustomStyledComponent/Text';

const Tag = ({id, name}) => {
  const {dispatch} = useContext(FormContext);
  return (
    <TouchableOpacity
      onPress={() =>
        Alert.alert('Remove', name, [
          {
            text: 'OK',
            onPress: () => dispatch({type: REMOVE_TAG, payload: id}),
          },
          {text: 'Cancel'},
        ])
      }
      style={styles.tag}>
      <CustomText
        fontSize={13}
        fontWeight="bold"
        color={PantoneColor.livingCoral}>
        {name}
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tag: {
    backgroundColor: PantoneColor.veryLivingCoral,
    borderRadius: 20,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 2,
    padding: 10,
    height: 35,
  },
});

export default Tag;
