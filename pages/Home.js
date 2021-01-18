/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, View, Image, StyleSheet, SafeAreaView} from 'react-native';
import {PantoneColor} from '../utils/Colors';

import {CustomText} from '../components/CustomStyledComponent/Text';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {Card} from '../components/Home/Card';
import {IconList} from '../components/Home/IconList';
import {Button} from '../components/CustomStyledComponent/Button/CustomButton';
const categories = [
  {
    nameIcon: 'tshirt',
    text: 'เสื้อผ้า',
  },
  {
    nameIcon: 'chair',
    text: 'เฟอร์นิเจอร์',
  },
  {
    nameIcon: 'book',
    text: 'หนังสือ',
  },
  {
    nameIcon: 'pen',
    text: 'อุปกรณ์การเรียน',
  },
  {
    nameIcon: 'hamburger',
    text: 'อาหาร',
  },
  {
    nameIcon: 'paw',
    text: 'สัตว์เลี้ยง',
  },
];

const items = [
  {
    owner: 'ปริญญา สัตะวัน',
    name: 'น้ำยาสรรพรส',
    img: require('../assets/img/drink2.jpg'),
    tags: ['จ๊วดๆ', 'เมาฟรี', 'ลูกหมาป่า', 'ยาวิเศษ', 'Magic'],
    category: 'เครื่องดื่มเพื่อสุขภาพ',
  },
  {
    owner: 'Stamp Watcharin',
    name: 'กระเป๋าหนังแท้มือสอง ยี่ห้อ Chanel',
    img: require('../assets/img/bag.jpg'),
    tags: ['เครื่องใช้', 'เสื้อผ้า', 'สิ่งของทั่วไป'],
    category: 'ของใช้',
  },
  {
    owner: 'Stamp Watcharin',
    name: 'แมวมือสองพันธ์ไซบีเรียนฮักนะ 🧡',
    img: '',
    tags: ['ของมือสอง', 'สัตว์เลี้ยง', 'แมวสุดน่ารัก', 'น้อนนนน', 'น้อนน'],
    category: 'สัตว์เลี้ยง',
  },
];
export default (props) => {
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <View style={{flexDirection: 'row'}}>
          <Button px={0} onPress={() => props.navigation.navigate('Profile')}>
            <Image
              style={{marginRight: 10}}
              source={require('../assets/img/profile.png')}
            />
          </Button>
          <View style={{justifyContent: 'center', paddingRight: 10}}>
            <CustomText fontSize={14}>Pathomporn Pankaew</CustomText>
            <CustomText fontSize={14} textAlign="left">
              @Job25721
            </CustomText>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Button
            onPress={() => props.navigation.navigate('Notification')}
            px={5}>
            <FeatherIcon name="bell" size={35} />
          </Button>
          <Button onPress={() => props.navigation.navigate('Chat')} px={5}>
            <FeatherIcon name="message-circle" size={35} />
          </Button>
        </View>
      </View>
      <View style={{paddingLeft: 10}}>
        <CustomText color={PantoneColor.livingCoral} spacing={10} type="header">
          SHARE
        </CustomText>
      </View>
      <ScrollView style={{marginHorizontal: 10}}>
        <View style={{marginTop: 20, marginBottom: 10}}>
          <CustomText fontSize={20} fontWeight={'bold'}>
            เลือกหมวดหมู่ที่ใช่สำหรับคุณ
          </CustomText>
        </View>
        <ScrollView horizontal>
          {categories.map((item) => (
            <IconList
              key={item.nameIcon}
              text={item.text}
              nameIcon={item.nameIcon}
            />
          ))}
        </ScrollView>
        <View style={{alignItems: 'center'}}>
          {items.map((item, i) => (
            <Card
              key={i}
              img={item.img}
              owner={item.owner}
              name={item.name}
              tags={item.tags}
              category={item.category}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
});
