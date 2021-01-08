import React, {useContext} from 'react';
import {Alert, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../../utils/Colors';
import {CustomText} from '../CustomStyledComponent/Text';
import {TagContext} from './Form';
const FormTag = ({id, name}) => {
  const {tags, setTag} = useContext(TagContext);
  return (
    <TouchableOpacity
      onPress={() =>
        Alert.alert('Remove', name, [
          {
            text: 'OK',
            onPress: () => setTag(tags.filter((tag) => tag.id !== id)),
          },
          {text: 'Cancel'},
        ])
      }
      style={styles.tag}>
      <CustomText fontSize={13} fontWeight="bold" color={Colors.white}>
        {name}
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tag: {
    backgroundColor: Colors._indigo_500,
    borderRadius: 20,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 2,
    padding: 10,
    height: 35,
    // marginVertical: 10,
  },
});

export default FormTag;
