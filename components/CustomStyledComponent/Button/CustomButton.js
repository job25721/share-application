/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Colors} from '../Colors';

export const Button = ({text, type, fontSize, rounded, onPress}) => {
  const [btnType, setType] = React.useState(Colors.default);
  const [textSize, setSize] = React.useState(18);
  React.useEffect(() => {
    type ? setType(Colors[`${type}`]) : null;
    fontSize ? setSize(fontSize) : null;
    console.log(rounded);
  }, [type, fontSize, rounded]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.btn,
        {backgroundColor: btnType.bg},
        rounded ? {borderRadius: 50} : null,
      ]}>
      <Text style={[styles.btnText, {color: btnType.text, fontSize: textSize}]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    padding: 10,
    shadowOpacity: 0.05,
    borderRadius: 13,
    margin: 5,
  },
  btnText: {
    fontFamily: 'Sukhumvit Set',
  },
});
