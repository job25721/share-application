/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {
  ScrollView,
  View,
  SafeAreaView,
  RefreshControl,
  Platform,
} from 'react-native';
import {Colors, PantoneColor} from '../utils/Colors';
import {AlertDialog, Button, CustomText} from '../components/custom-components';
import {RootState, useDispatch} from '../store';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {RefreshContext, RootStackParamList} from '../../App';
import {StackNavigationProp} from '@react-navigation/stack';
import {categories} from '../utils/category';
import {Card, HomeHeader, IconList} from '../components/Home';
import {RequestModal} from '../components/Detail';
import {Item} from '../store/item/types';
import {createRequestAction} from '../store/request/actions';
import {useMutation} from '@apollo/client';
import {CREATE_REQUEST} from '../graphql/mutation/request';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Tab'>;
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Tab'>;

type Props = {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
};

const Home: React.FC<Props> = ({navigation}) => {
  const feedItems = useSelector((state: RootState) => state.item.feedItems);
  const savedItems = useSelector((state: RootState) => state.user.mySavedItem);

  const dispatch = useDispatch();
  const rootStackNavigation = useNavigation<
    StackNavigationProp<RootStackParamList, 'Detail'>
  >();

  const [reload, setReload] = useState<boolean>(false);
  const [onRequest, setOnRequest] = useState<{
    item: Item | null;
    open: boolean;
  }>({item: null, open: false});
  const [confirmRequest, setConfrim] = useState<boolean>(false);
  const scrollRef = useRef<ScrollView>(null);
  const [createRequest] = useMutation(CREATE_REQUEST);

  const {feedHome} = useContext(RefreshContext);
  const {refresh, refreshing, itemLoading, error} = feedHome;

  async function reloadData() {
    try {
      setReload(true);
      await refresh();
    } catch (err) {
      setReload(false);
      // console.log(err);
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
      <AlertDialog
        open={confirmRequest}
        onClosePress={() => {
          setConfrim(false);
        }}
        onConfirm={() => {
          setConfrim(false);
          if (onRequest.item) {
            dispatch({
              type: 'SET_REQUEST_ITEM_ID',
              payload: onRequest.item?.id,
            });
            setOnRequest({item: null, open: false});
            if (Platform.OS === 'android') {
              AndroidKeyboardAdjust.setAdjustResize();
            }
            createRequestAction(createRequest, rootStackNavigation)(dispatch);
          }
        }}
        title="ยืนยันคำขอ"
        content="คำขอจะถูกส่งไปหาเจ้าของ และจะทำการสร้างห้องแชทอัตโนมัติ"
      />
      <RequestModal
        name={onRequest.item?.name}
        isOpen={onRequest.open}
        onClosePress={() => {
          setOnRequest({item: null, open: false});
          dispatch({type: 'CLEAR_REQUEST_DATA'});
        }}
        onSubmit={() => setOnRequest({...onRequest, open: false})}
      />
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
                onRequestClick={(item) => setOnRequest({item, open: true})}
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
