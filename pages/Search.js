/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
  Keyboard,
} from 'react-native';
import {Colors, PantoneColor} from '../utils/Colors';
import {DismissKeyboard} from '../components/CustomStyledComponent/DismissKeyboard';
import {CustomText} from '../components/CustomStyledComponent/Text';
import {Input} from '../components/CustomStyledComponent/Input/CustomInput';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Tag from '../components/Home/Tag';
import Column from '../components/Search/column';
import {Button} from '../components/CustomStyledComponent/Button/CustomButton';

export default (props) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
      <View style={styles.container}>
        <View>
          <CustomText type="header">Search</CustomText>
        </View>
        <View
          style={{
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginVertical: 10,
          }}>
          <Input
            backgroundColor={Colors._gray_500}
            placeholder="ค้นหา..."
            width="80%"
          />
          <Button onPress={() => Keyboard.dismiss()}>
            <FeatherIcon
              style={{alignSelf: 'center'}}
              name="search"
              size={40}
            />
          </Button>
        </View>
        <View style={{flexDirection: 'row', marginVertical: 10}}>
          <CustomText fontSize={16}>Filter</CustomText>
          <FeatherIcon
            name="filter"
            size={16}
            style={{
              color: PantoneColor.turkishSea,
              alignSelf: 'center',
              marginLeft: 5,
            }}
          />
        </View>
        <View style={{marginBottom: 10}}>
          <View style={{marginBottom: 10}}>
            <CustomText type="subheader">Trending</CustomText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {[
              'หนังสือ',
              'อุปกรณ์การเรียน',
              'เสื้อผ้า',
              'สิ่งของเครื่องใช้',
              'ของกิน',
            ].map((item, i) => (
              <Tag key={i} text={item} />
            ))}
          </View>
        </View>
        <>
          <CustomText type="subheader">Result</CustomText>
          <ScrollView>
            {[1, 2, 3, 4, 5].map((item) => (
              <Column key={item} />
            ))}
          </ScrollView>
        </>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flex: 1,
  },
});
