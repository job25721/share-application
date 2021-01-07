/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {Colors} from '../../../utils/Colors';

export const Input = ({
  type,
  width,
  textAlign,
  placeholder,
  onChangeText,
  rounded,
  focus,
  backgroundColor,
  multiline,
  height,
}) => {
  const [isFocus, setFocus] = React.useState(false);
  const [secure, setSecure] = React.useState(false);
  const [w, setWidth] = React.useState(200);
  const [align, setAlign] = React.useState('auto');
  React.useEffect(() => {
    type === 'password' ? setSecure(true) : setSecure(false);
    width ? setWidth(width) : null;
    textAlign ? setAlign(textAlign) : null;
  }, [type, width, textAlign]);
  return (
    <TextInput
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      multiline={multiline ? true : false}
      style={[
        styles.input,
        isFocus && focus ? styles.onFocus : null,
        {width: w},
        height ? {height} : null,
        {textAlign: align},
        rounded ? {borderRadius: 50} : null,
        backgroundColor ? {backgroundColor} : null,
      ]}
      placeholder={placeholder}
      secureTextEntry={secure}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: Colors._gray_900,
    margin: 5,
    fontFamily: 'Sukhumvit Set',
    borderWidth: 1,
  },
  onFocus: {
    borderColor: Colors._indigo_400,
  },
});
