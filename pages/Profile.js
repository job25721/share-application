/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import Profile from '../components/Profile/ProfileImage';
import IconList from '../components/Profile/IconList';
import {useQuery} from '@apollo/client';
import ListCrad from '../components/Profile/ListCard';
import {CustomText} from '../components/CustomStyledComponent/Text';
import {Colors, PantoneColor} from '../utils/Colors';
import {Button} from '../components/CustomStyledComponent/Button/CustomButton';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {SET_TOKEN, SET_USER_DATA} from '../store/actions/user';
import {ItemChatCard} from '../components/Profile/ItemCard';
import {useNavigation} from '@react-navigation/native';
import {getMyItem} from '../graphql/query/user';
export default (props) => {
  const {
    route: {
      params: {getMyInfo},
    },
  } = props;
  const [active, setActive] = useState(0);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {data, error, loading, refetch} = useQuery(getMyItem);
  // useEffect(() => {
  //   console.log(props.route.params);
  // }, []);

  // useEffect(() => {
  //   if (data) {
  //     console.log(data);
  //   }
  // }, [data]);
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: Colors.white, paddingVertical: 10}}>
      <View style={styles.header}>
        <Button onPress={() => props.navigation.goBack()}>
          <Feather name="arrow-left" size={30} />
        </Button>
        <Feather name="user" size={35} style={{paddingRight: 10}} />
        <CustomText color={PantoneColor.livingCoral} fontSize={35}>
          Profile
        </CustomText>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            right: 20,
          }}>
          <CustomText>Logout</CustomText>
          <Button
            onPress={async () => {
              await AsyncStorage.removeItem('userToken');
              dispatch({type: SET_TOKEN, payload: null});
              dispatch({type: SET_USER_DATA, payload: null});
              props.navigation.navigate('Tab');
            }}
            px={0}>
            <Feather color={Colors._red_500} name="log-out" size={25} />
          </Button>
        </View>
      </View>
      <Profile
        navigate={props.navigation.navigate}
        name={`${getMyInfo.info.firstName} ${getMyInfo.info.lastName}`}
        username={getMyInfo.username}
      />
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        {[
          {
            nameIcon: 'user',
            text: 'ทั่วไป',
          },

          {
            nameIcon: 'box',
            text: 'ของของฉัน',
          },
          {
            nameIcon: 'arrow-up-right',
            text: 'รับต่อมา',
          },
          {
            nameIcon: 'bookmark',
            text: 'ที่บันทึกไว้',
          },
        ].map((item, i) => (
          <IconList
            active={active === i ? true : false}
            key={i}
            onPress={() => setActive(i)}
            text={item.text}
            nameIcon={item.nameIcon}
          />
        ))}
      </View>
      {active === 0 ? (
        <View
          style={{
            alignSelf: 'center',
            marginTop: 30,
            borderRadius: 15,
            flex: 1,
            backgroundColor: Colors._gray_900,
            width: 320,
            alignItems: 'center',
          }}>
          <View
            style={{margin: '10%', justifyContent: 'space-evenly', flex: 1}}>
            <CustomText fontSize={20}>
              ชื่อ-สกุล:
              {`${getMyInfo.info.firstName} ${getMyInfo.info.lastName}`}
            </CustomText>
            <CustomText fontSize={20}>อายุ: {getMyInfo.info.age} ปี</CustomText>
            <CustomText fontSize={20}>
              วัน/เดือน/ปีเกิด:{' '}
              {getMyInfo.info.birthDate.substr(
                0,
                getMyInfo.info.birthDate.lastIndexOf('T'),
              )}
            </CustomText>
          </View>
        </View>
      ) : active === 1 ? (
        <ScrollView style={{paddingHorizontal: 20}}>
          {data ? (
            data.getMyItem.map((item) => (
              <ItemChatCard
                titleImg={item.name}
                imgSrc={item.images[0]}
                category={item.category}
                tags={item.tags}
                onPress={() =>
                  navigation.navigate('Chat', {name: 'Stamp Watcharin'})
                }
              />
            ))
          ) : (
            <CustomText>Hello</CustomText>
          )}
        </ScrollView>
      ) : active === 2 ? (
        <ScrollView style={{paddingHorizontal: 20}}>
          <ItemChatCard
            onPress={() =>
              navigation.navigate('Chat', {name: 'Stamp Watcharin'})
            }
          />
        </ScrollView>
      ) : active === 3 ? (
        <ScrollView style={{paddingHorizontal: 20}}>
          <ItemChatCard
            onPress={() =>
              navigation.navigate('Chat', {name: 'Stamp Watcharin'})
            }
          />
        </ScrollView>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {flexDirection: 'row', marginTop: 20},
});
