/* eslint-disable no-unused-vars */
import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Button} from '../components/CustomStyledComponent/Button/CustomButton';
import {CustomText} from '../components/CustomStyledComponent/Text';
import NotificationList from '../components/Noti/ImageList';
import {PantoneColor} from '../utils/Colors';
import Feather from 'react-native-vector-icons/Feather';

export default ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.header}>
        <Button onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={30} />
        </Button>
        <Feather name="bell" size={35} style={{paddingRight: 10}} />
        <CustomText color={PantoneColor.livingCoral} fontSize={35}>
          Notification
        </CustomText>
      </View>
      <ScrollView>
        {[1, 2, 3, 4, 5, 6, 7].map((item) => (
          <NotificationList key={item} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {flexDirection: 'row', marginTop: 20},
});
