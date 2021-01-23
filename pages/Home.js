/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback, useEffect} from 'react';
import {ScrollView, View, SafeAreaView, RefreshControl} from 'react-native';
import {Colors, PantoneColor} from '../utils/Colors';

import {CustomText} from '../components/CustomStyledComponent/Text';

import {Card} from '../components/Home/Card';
import {IconList} from '../components/Home/IconList';

import {useDispatch, useSelector} from 'react-redux';
import {getAllItem} from '../graphql/query/item';
import {useQuery} from '@apollo/client';
import {SET_FEED_ITEMS, SET_REFRESH_FEED} from '../store/types/item';
import HomeHeader from '../components/Home/HomeHeader';
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

const Home = (props) => {
  const items = useSelector((state) => state.item.feedItems);
  const refreshFeed = useSelector((state) => state.item.refreshFeed);
  const {data, error, loading, refetch} = useQuery(getAllItem);
  const [refreshing, setRefreshing] = useState(false);
  const [wait, setWait] = useState(false);
  const dispatch = useDispatch();
  const [errMsg, setErr] = useState('');

  const refetchItem = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
      if (data) {
        dispatch({
          type: SET_FEED_ITEMS,
          payload: data.getAllItem.filter(({status}) => status === 'available'),
        });
      }
      setRefreshing(false);
    } catch (err) {}
  }, [refetch, data, dispatch]);

  useEffect(() => {
    const refresh = async () => {
      if (refreshFeed) {
        await refetchItem();
        dispatch({type: SET_REFRESH_FEED, payload: false});
      }
    };
    refresh();
  }, [refreshFeed, dispatch, refetchItem]);

  useEffect(() => {
    if (data) {
      dispatch({
        type: SET_FEED_ITEMS,
        payload: data.getAllItem.filter(({status}) => status === 'available'),
      });
    }
  }, [data, dispatch]);

  if (loading) {
    return (
      <SafeAreaView
        style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <CustomText>Loading..</CustomText>
      </SafeAreaView>
    );
  }

  if (error) {
    refetch();
    return (
      <SafeAreaView
        style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        {!wait ? (
          <CustomText>{errMsg === '' ? error.message : errMsg}</CustomText>
        ) : null}
        {!refreshing ? (
          <Button
            text="Reload"
            onPress={() => {
              dispatch({type: SET_REFRESH_FEED, payload: true});
            }}
            bg={PantoneColor.blueDepths}
            color={Colors.white}
          />
        ) : (
          <CustomText>Loading...</CustomText>
        )}
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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refetchItem} />
        }
        style={{marginHorizontal: 10}}>
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
              id={item.id}
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

export default Home;
