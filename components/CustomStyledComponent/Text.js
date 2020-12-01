import React, {useState, useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';

export const CustomText = ({
  children,
  fontSize,
  lineHeight,
  spacing,
  textDecoration,
  type,
  textAlign,
}) => {
  const [size, setSize] = useState(18);
  const [letterSpacing, setSpacing] = useState(0);
  const [lHeight, setLineHeight] = useState(0);
  const [textDecorationLine, setTextDecorationLine] = useState('none');
  useEffect(() => {
    fontSize ? setSize(fontSize) : null;
    spacing ? setSpacing(spacing) : null;
    lineHeight ? setLineHeight(lineHeight) : null;
    textDecoration
      ? setTextDecorationLine(textDecoration)
      : setTextDecorationLine('none');
    type === 'header' ? setSize(50) : type === 'subheader' ? setSize(30) : null;
  }, [fontSize, spacing, lineHeight, textDecoration, type]);
  return (
    <Text
      style={[
        styles.text,
        {fontSize: size},
        {textDecorationLine},
        spacing ? {letterSpacing} : null,
        lineHeight ? {lineHeight: lHeight} : null,
        textAlign ? {textAlign} : null,
      ]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Sukhumvit Set',
  },
});
