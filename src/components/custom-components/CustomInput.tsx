/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Platform, StyleSheet, TextInput, TextStyle} from 'react-native';
import {Colors} from '../../utils/Colors';

type Shadow = 'sm' | 'md' | 'lg';

interface InputProps {
  type?: string;
  width?: number | string;
  textAlign?: TextStyle['textAlign'];
  placeholder?: string;
  onChangeText?: any;
  rounded?: boolean;
  focus?: boolean;
  backgroundColor?: string;
  multiline?: boolean;
  height?: number | string;
  shadow?: Shadow;
  textAlignVertical?: TextStyle['textAlignVertical'];
  maxLength?: number;
  value?: any;
}

export const Input: React.FC<InputProps> = ({
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
  textAlignVertical,
  maxLength,
  value,
}) => {
  const [isFocus, setFocus] = useState<boolean>(false);
  const [secure, setSecure] = useState<boolean>(false);
  const [w, setWidth] = useState<string | number>('auto');
  const [shadowOpacity, setShadow] = useState<number>(0);
  React.useEffect(() => {
    type === 'password' ? setSecure(true) : setSecure(false);
    width ? setWidth(width) : null;
    shadow === 'sm'
      ? setShadow(0.05)
      : shadow === 'md'
      ? setShadow(0.1)
      : shadow === 'lg'
      ? setShadow(0.2)
      : setShadow(0);
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
        textAlign ? {textAlign} : null,
        rounded ? {borderRadius: 50} : null,
        backgroundColor ? {backgroundColor} : null,
        textAlignVertical ? {textAlignVertical} : null,
      ]}
      placeholder={placeholder}
      secureTextEntry={secure}
      onChangeText={onChangeText}
      maxLength={maxLength}
      value={value}
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
    marginVertical: 5,
    fontFamily: Platform.OS === 'ios' ? 'Sukhumvit Set' : 'SukhumvitSet-Medium',
    borderWidth: 1,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  onFocus: {
    borderColor: Colors._indigo_400,
  },
});
