import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {Colors} from '../Colors';

export const Input = ({type, width, textAlign, placeholder, onChangeText}) => {
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
      style={[
        styles.input,
        isFocus ? styles.onFocus : null,
        {width: w},
        {textAlign: align},
      ]}
      placeholder={placeholder}
      secureTextEntry={secure}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowOpacity: 0.05,
    margin: 5,
    fontFamily: 'Sukhumvit Set',
  },
  onFocus: {
    shadowColor: Colors.link.text,
    shadowOpacity: 0.7,
    shadowOffset: {
      height: 0.25,
      width: 0.25,
    },
  },
});
