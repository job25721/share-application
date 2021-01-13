/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, View, Image, StyleSheet, SafeAreaView} from 'react-native';
import {Colors, PantoneColor} from '../utils/Colors';
import {DismissKeyboard} from '../components/CustomStyledComponent/DismissKeyboard';
import {CustomText} from '../components/CustomStyledComponent/Text';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import CardList from '../components/Home/CardList';
import {Card} from '../components/Home/Card';

export default (props) => {
  return (
    <DismissKeyboard>
      <>
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
                  @Job55140
                </CustomText>
              </View>
            </View>
            <View>
              <FeatherIcon name="message-circle" size={40} />
            </View>
          </View>
          <View style={{padding: 10}}>
            <CustomText
              color={PantoneColor.livingCoral}
              spacing={5}
              type="header">
              SHARE
            </CustomText>
          </View>
          <ScrollView style={{paddingHorizontal: 10}}>
            <View style={{marginTop: 20, marginBottom: 10}}>
              <CustomText fontSize={20} fontWeight={'bold'}>
                เลือกหมวดหมู่ที่ใช่สำหรับคุณ
              </CustomText>
            </View>
            <ScrollView horizontal style={{height: 230}}>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <CardList key={item} />
              ))}
            </ScrollView>
            <View style={{marginVertical: 20, flexDirection: 'row'}}>
              <AwesomeIcon
                style={{marginRight: 8, color: PantoneColor.livingCoral}}
                size={25}
                name="fire-alt"
              />
              <CustomText fontSize={22} fontWeight={'bold'}>
                กำลังมาแรง
              </CustomText>
            </View>
            <View style={{alignItems: 'center'}}>
              {[
                {
                  name: 'Stamp Watcharin',
                  title: 'กระเป๋าหนังแท้มือสอง ยี่ห้อ Chanel',
                  img: require('../assets/img/bag.jpg'),
                  tag: ['สิ่งของเครื่องใช้', 'เสื้อผ้า', 'สิ่งของทั่วไป'],
                },
                {
                  name: 'Stamp Watcharin',
                  title: 'แมวมือสองพันธ์ไซบีเรียนฮักนะ 🧡',
                  img: '',
                  tag: [
                    'ของมือสอง',
                    'สัตว์เลี้ยง',
                    'แมวสุดน่ารัก',
                    'เหมือนกับคนอ่านเลย',
                  ],
                },
              ].map((item, i) => (
                <Card
                  key={i}
                  img={item.img}
                  title={item.title}
                  name={item.name}
                  tag={item.tag}
                  navigate={props.navigation.navigate}
                />
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    </DismissKeyboard>
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
