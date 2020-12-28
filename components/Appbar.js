import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from './CustomStyledComponent/Colors';
import Feather from 'react-native-vector-icons/Feather';
import {Button} from './CustomStyledComponent/Button/CustomButton';
export default function AppABar({children}) {
  return (
    <>
      {children}
      <View style={styles.appBar}>
        <Button text={<Feather name="home" size={30} />} px={0} />
        <Button text={<Feather name="search" size={30} />} px={0} />
        <Button text={<Feather name="plus" size={30} />} px={0} />
        <Button text={<Feather name="message-circle" size={30} />} px={0} />
        <Button text={<Feather name="user" size={30} />} px={0} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appBar: {
    height: '5.5%',
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
