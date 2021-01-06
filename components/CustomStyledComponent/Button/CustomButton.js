/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Colors} from '../../../utils/Colors';

export const Button = ({
  text,
  bg,
  color,
  fontSize,
  rounded,
  onPress,
  width,
  mx,
  my,
  px,
  py,
  children,
}) => {
  const [btnBg, setType] = useState('transparent');
  const [textColor, setColor] = useState(Colors.black);
  const [textSize, setSize] = useState(18);
  const [btnWidth, setBtnWidth] = useState(null);
  const [paddingX, setPx] = useState(25);
  const [paddingY, setPy] = useState(5);
  useEffect(() => {
    bg ? setType(bg) : null;
    fontSize ? setSize(fontSize) : null;
    color ? setColor(color) : null;
    width ? setBtnWidth(width) : null;
    px >= 0 ? setPx(px) : null;
    py >= 0 ? setPy(py) : null;
  }, [bg, fontSize, color, width, px, py]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.btn,
        {backgroundColor: btnBg},
        rounded ? {borderRadius: 20} : null,
        width ? {width: btnWidth} : null,
        mx ? {marginHorizontal: mx} : null,
        my ? {marginVertical: my} : null,
        {paddingHorizontal: paddingX, paddingVertical: paddingY},
      ]}>
      {children ? (
        children
      ) : (
        <Text
          style={[
            styles.btnText,
            {color: textColor, fontSize: textSize, textAlign: 'center'},
          ]}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    borderRadius: 5,
    margin: 5,
    justifyContent: 'center',
  },
  btnText: {
    fontFamily: 'Sukhumvit Set',
  },
});
