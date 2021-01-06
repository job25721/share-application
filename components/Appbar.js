import React from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {Colors} from './CustomStyledComponent/Colors';
import Feather from 'react-native-vector-icons/Feather';
import {Button} from './CustomStyledComponent/Button/CustomButton';
export default function AppABar({children, navigate}) {
  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>{children}</View>
        <View style={styles.appBar}>
          <Button
            onPress={() => navigate('Login')}
            text={<Feather name="home" size={30} />}
            px={0}
          />
          <Button text={<Feather name="search" size={30} />} px={0} />
          <Button text={<Feather name="plus" size={30} />} px={0} />
          <Button
            onPress={() => navigate('Chat')}
            text={<Feather name="message-circle" size={30} />}
            px={0}
          />
          <Button text={<Feather name="user" size={30} />} px={0} />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '92%',
    padding: 20,
  },
  appBar: {
    height: '8%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
