/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Colors} from '../Colors';

export const Button = ({
  text,
  bg,
  color,
  fontSize,
  rounded,
  onPress,
  width,
}) => {
  const [btnBg, setType] = useState('transparent');
  const [textColor, setColor] = useState(Colors.black);
  const [textSize, setSize] = useState(18);
  const [btnWidth, setBtnWidth] = useState(null);
  useEffect(() => {
    bg ? setType(Colors[`${bg}`]) : null;
    fontSize ? setSize(fontSize) : null;
    color ? setColor(Colors[`${color}`]) : null;
    width ? setBtnWidth(width) : null;
  }, [bg, fontSize, rounded, color, width]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.btn,
        {backgroundColor: btnBg},
        rounded ? {borderRadius: 20} : null,
        width ? {width: btnWidth} : null,
      ]}>
      <Text
        style={[
          styles.btnText,
          {color: textColor, fontSize: textSize, textAlign: 'center'},
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    margin: 5,

    width: 100,
  },
  btnText: {
    fontFamily: 'Sukhumvit Set',
  },
});
