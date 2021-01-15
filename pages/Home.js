/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, View, Image, StyleSheet, SafeAreaView} from 'react-native';
import {PantoneColor} from '../utils/Colors';

import {CustomText} from '../components/CustomStyledComponent/Text';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
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
export default (props) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.headerContainer}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={{marginRight: 10}}
            source={require('../assets/img/profile.png')}
          />
          <View style={{justifyContent: 'center', paddingRight: 10}}>
            <CustomText fontSize={14}>Pathomporn Pankaew</CustomText>
            <CustomText fontSize={14} textAlign="left">
              @Job25721
            </CustomText>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Button onPress={() => null} px={5}>
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
      <ScrollView style={{paddingHorizontal: 10}}>
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
        {/* <View
          style={{
            marginVertical: 20,
            paddingHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <AwesomeIcon
            style={{marginRight: 8, color: PantoneColor.livingCoral}}
            size={25}
            name="fire-alt"
          />
          <CustomText fontSize={25} fontWeight={'bold'}>
            ล่าสุด
          </CustomText>
        </View> */}
        <View style={{alignItems: 'center'}}>
          {[
            {
              name: 'Stamp Watcharin',
              title: 'กระเป๋าหนังแท้มือสอง ยี่ห้อ Chanel',
              img: require('../assets/img/bag.jpg'),
              tag: ['เครื่องใช้', 'เสื้อผ้า', 'สิ่งของทั่วไป'],
            },
            {
              name: 'Stamp Watcharin',
              title: 'แมวมือสองพันธ์ไซบีเรียนฮักนะ 🧡',
              img: '',
              tag: [
                'ของมือสอง',
                'สัตว์เลี้ยง',
                'แมวสุดน่ารัก',
                'น้อนนนน',
                'น้อนน',
              ],
            },
          ].map((item, i) => (
            <Card
              key={i}
              img={item.img}
              title={item.title}
              name={item.name}
              tag={item.tag}
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
