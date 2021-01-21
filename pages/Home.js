/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {ScrollView, View, StyleSheet, SafeAreaView, Button} from 'react-native';
import {PantoneColor} from '../utils/Colors';

import {CustomText} from '../components/CustomStyledComponent/Text';

import {Card} from '../components/Home/Card';
import {IconList} from '../components/Home/IconList';

import {useDispatch, useSelector} from 'react-redux';
import {getAllItem} from '../graphql/query/item';
import {useQuery} from '@apollo/client';
import {SET_FEED_ITEMS} from '../store/types/item';
import HomeHeader from '../components/Home/HomeHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  const {data, error, loading} = useQuery(getAllItem);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data.getAllItem);

      dispatch({type: SET_FEED_ITEMS, payload: data.getAllItem});
    }
    // console.log('in home');
    // console.log(items);
  }, [data, dispatch, error]);

  if (loading) {
    return (
      <SafeAreaView
        style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <CustomText>Loading..</CustomText>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <CustomText>{error.message}</CustomText>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <HomeHeader />
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
          {items.map((item) => (
            <Card
              key={item.id}
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
