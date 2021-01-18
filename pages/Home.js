/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {ScrollView, View, Image, StyleSheet, SafeAreaView} from 'react-native';
import {PantoneColor} from '../utils/Colors';

import {CustomText} from '../components/CustomStyledComponent/Text';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {Card} from '../components/Home/Card';
import {IconList} from '../components/Home/IconList';
import {Button} from '../components/CustomStyledComponent/Button/CustomButton';
import {useSelector} from 'react-redux';
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

const Home = (props) => {
  const items = useSelector((state) => state.item.feedItems);
  useEffect(() => {
    console.log('in home');
    console.log(items);
  }, [items]);
  return (
    <SafeAreaView style={{flex: 1}}>
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
              images={item.images.map((img) => img)}
              owner={item.owner}
              name={item.name}
              tags={item.tags}
              category={item.category}
              description={item.description}
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

export default Home;
