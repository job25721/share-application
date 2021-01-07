import React from 'react';
import {StyleSheet, View, SafeAreaView, ScrollView} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {Button} from './Button/CustomButton';

const NavigationBar = ({children, navigate}) => {
  return (
    <SafeAreaView style={styles.container}>
      {children}
      <View style={styles.appBar}>
        <Button
          onPress={() => navigate('Index')}
          text={<Feather name="home" size={30} />}
          px={0}
        />
        <Button text={<Feather name="search" size={30} />} px={0} />
        <Button text={<Feather name="plus" size={30} />} px={0} />
        <Button
          onPress={() => navigate('People')}
          text={<Feather name="message-circle" size={30} />}
          px={0}
        />
        <Button text={<Feather name="user" size={30} />} px={0} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appBar: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
});

export default NavigationBar;
