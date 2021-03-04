/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {ScrollView, View, SafeAreaView, RefreshControl} from 'react-native';
import {Colors, PantoneColor} from '../utils/Colors';
import {AlertDialog, Button, CustomText} from '../components/custom-components';
import {RootState} from '../store';
import {RouteProp} from '@react-navigation/native';
import {RefreshContext, RootStackParamList} from '../../App';
import {StackNavigationProp} from '@react-navigation/stack';
import {categories} from '../utils/category';
import {Card, HomeHeader, IconList} from '../components/Home';

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Tab'>;
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Tab'>;

type Props = {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
};

const Home: React.FC<Props> = ({navigation}) => {
  const feedItems = useSelector((state: RootState) => state.item.feedItems);
  const savedItems = useSelector((state: RootState) => state.user.mySavedItem);

  const [reload, setReload] = useState<boolean>(false);
  const scrollRef = useRef<ScrollView>(null);

  const {feedHome} = useContext(RefreshContext);
  const {refresh, refreshing, itemLoading, error} = feedHome;

  async function reloadData() {
    try {
      setReload(true);
      await refresh();
    } catch (err) {
      setReload(false);
      console.log(err);
    }

    // setTimeout(() => {
    //   setReload(false);
    // }, 10000);
  }

  if (error) {
    return (
      <SafeAreaView
        style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        {!reload ? (
          <>
            <CustomText>{error.message}</CustomText>
            <Button
              text="reload"
              color={Colors.white}
              bg={PantoneColor.blueDepths}
              onPress={reloadData}
            />
          </>
        ) : (
          <AlertDialog title="กำลังโหลด..." disabledBtn open={reload} />
        )}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors._gray_300}}>
      <HomeHeader />
      <View style={{paddingLeft: 10}}>
        <CustomText color={PantoneColor.livingCoral} spacing={10} type="header">
          SHARE
        </CustomText>
      </View>
      <ScrollView
        ref={scrollRef}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
        style={{marginHorizontal: 10, borderRadius: 15}}>
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
              onPress={() => {
                navigation.navigate('Tab', {
                  screen: 'Search',
                  params: {
                    catSearch: item.text,
                  },
                });
              }}
            />
          ))}
        </ScrollView>

        <View
          style={{
            alignItems: 'center',
            marginTop: 20,
            paddingHorizontal: 1,
          }}>
          {feedItems.length > 0 && !refreshing ? (
            feedItems.map((item) => (
              <Card
                key={item.id}
                isSaved={savedItems.some(({id}) => id === item.id)}
                item={item}
              />
            ))
          ) : itemLoading || refreshing ? (
            <AlertDialog title="กำลังโหลด..." disabledBtn open={true} />
          ) : !refreshing ? (
            <>
              <CustomText fontWeight="bold">
                ไม่มีของชิ้นใดอยู่ในระบบ
              </CustomText>
              <CustomText fontWeight="500" fontSize={16}>
                มาร่วม SHARE และสร้างสังคมที่น่าอยู่กันเถอะ!
              </CustomText>
            </>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
