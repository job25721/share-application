/* eslint-disable react-native/no-inline-styles */
import React, {MutableRefObject, useContext, useRef} from 'react';
import {
  ScrollView,
  View,
  SafeAreaView,
  RefreshControl,
  ScrollResponderEvent,
} from 'react-native';
import {Colors, PantoneColor} from '../utils/Colors';

import {IconList} from '../components/Home/IconList';

import {useSelector} from 'react-redux';

import {Button, CustomText} from '../components/custom-components';
import {RootState} from '../store';

import HomeHeader from '../components/Home/HomeHeader';
import {Card} from '../components/Home/Card';
import {RouteProp} from '@react-navigation/native';
import {RefreshHomeContext, RootStackParamList} from '../../App';
import {StackNavigationProp} from '@react-navigation/stack';
import {categories} from '../utils/category';

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Tab'>;
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Tab'>;

type Props = {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
};

const Home: React.FC<Props> = () => {
  const feedItems = useSelector((state: RootState) => state.item.feedItems);
  const scrollRef = useRef(null);

  const {refresh, refreshing, itemLoading, error} = useContext(
    RefreshHomeContext,
  );

  if (itemLoading) {
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
        <Button
          text="reload"
          color={Colors.white}
          bg={PantoneColor.blueDepths}
          onPress={refresh}
        />
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
      <View
        style={{
          position: 'absolute',
          zIndex: 1,
          bottom: 535,
          alignSelf: 'center',
        }}>
        <Button
          text="new 3 items arrived"
          bg="rgba(0,0,0,0.9)"
          rounded
          color={Colors.white}
          onPress={async () => {
            scrollRef.current.scrollTo({top: 0});
            await refresh();
          }}
        />
      </View>
      <ScrollView
        ref={scrollRef}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
        style={{marginHorizontal: 10}}>
        <View style={{marginBottom: 10}}>
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

        <View
          style={{
            alignItems: 'center',
            marginTop: 20,
          }}>
          {feedItems.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
