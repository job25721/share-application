/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Colors} from '../../../utils/Colors';

export const CustomPicker = ({
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
  shadow,
  children,
}) => {
  const [isFocus, setFocus] = useState(false);
  const [secure, setSecure] = useState(false);
  const [w, setWidth] = useState('auto');
  const [align, setAlign] = useState('auto');
  const [shadowOpacity, setShadow] = useState(0);
  React.useEffect(() => {
    type === 'password' ? setSecure(true) : setSecure(false);
    width ? setWidth(width) : null;
    textAlign ? setAlign(textAlign) : null;
    shadow === 'sm'
      ? setShadow(0.05)
      : shadow === 'md'
      ? setShadow(0.1)
      : shadow === 'lg'
      ? setShadow(0.2)
      : null;
  }, [type, width, textAlign, shadow]);
  return (
    <TextInput
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      multiline={multiline ? true : false}
      style={[
        styles.input,
        isFocus && focus ? styles.onFocus : null,
        {width: w, shadowOpacity},
        height ? {height} : null,
        {textAlign: align},
        rounded ? {borderRadius: 50} : null,
        backgroundColor ? {backgroundColor} : null,
      ]}
      placeholder={placeholder}
      secureTextEntry={secure}
      onChangeText={onChangeText}>
      {children}
    </TextInput>
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
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  onFocus: {
    borderColor: Colors._indigo_400,
  },
});