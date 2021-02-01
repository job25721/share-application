/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {View, ScrollView, SafeAreaView, StyleSheet} from 'react-native';

import {Icontab, ProfileImage} from '../components/Profile/';

import {CustomText, Button} from '../components/custom-components';
import {Colors, PantoneColor} from '../utils/Colors';

import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {RouteProp} from '@react-navigation/native';

import {RefreshContext, RootStackParamList} from '../../App';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootState, useDispatch} from '../store';
import {useSelector} from 'react-redux';
import client from '../graphql/client';
interface ProfileTabIcons {
  name: string;
  text: string;
}
const profileTabIcons: ProfileTabIcons[] = [
  {
    name: 'user',
    text: 'ทั่วไป',
  },

  {
    name: 'box',
    text: 'ของของฉัน',
  },
  {
    name: 'arrow-up-right',
    text: 'รับต่อมา',
  },
  {
    name: 'bookmark',
    text: 'ที่บันทึกไว้',
  },
];

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;
type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile'
>;

type Props = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
};

const Profile: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(0);
  const {feedHome} = useContext(RefreshContext);
  const {refresh} = feedHome;

  // const myItem = useQuery<MyItemQueryType>(getMyItem);
  const userData = useSelector((state: RootState) => state.user.userData);

  const changeProfileTab = async (tabIndex: number) => {
    try {
      if (tabIndex === 1) {
        // await myItem.refetch();
      } else if (tabIndex === 2) {
        //do something...
      } else if (tabIndex === 3) {
        //do something...
      }

      setActive(tabIndex);
    } catch (err) {
      console.log(err);
    }
  };

  if (userData) {
    return (
      <SafeAreaView
        style={{flex: 1, backgroundColor: Colors.white, paddingVertical: 10}}>
        <View style={styles.header}>
          <Button onPress={() => navigation.goBack()}>
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
                try {
                  await AsyncStorage.removeItem('userToken');
                  await AsyncStorage.removeItem('userInfo');
                  dispatch({type: 'USER_LOGOUT'});
                  await client.cache.reset();
                  await refresh();
                  navigation.navigate('Tab');
                } catch (err) {
                  console.log(err);
                }
              }}
              px={0}>
              <Feather color={Colors._red_500} name="log-out" size={25} />
            </Button>
          </View>
        </View>
        <ProfileImage
          name={`${userData.info.firstName} ${userData.info.lastName}`}
          username={userData.username}
          img={userData.avatar}
        />
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          {profileTabIcons.map((item, i) => (
            <Icontab
              active={active === i ? true : false}
              key={i}
              onPress={() => changeProfileTab(i)}
              text={item.text}
              name={item.name}
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
                {`${userData.info.firstName} ${userData.info.lastName}`}
              </CustomText>
              <CustomText fontSize={20}>
                อายุ: {userData.info.age} ปี
              </CustomText>
              <CustomText fontSize={20}>
                วัน/เดือน/ปีเกิด:{' '}
                {userData.info.birthDate
                  ? userData.info.birthDate.substr(
                      0,
                      userData.info.birthDate.lastIndexOf('T'),
                    )
                  : null}
              </CustomText>
            </View>
          </View>
        ) : active === 1 ? (
          <ScrollView style={{paddingHorizontal: 20}}>
            {/* {myItem.data
              ? myItem.data.getMyItem.map(() => (
                  <CustomText>Hello</CustomText>
                  //   <ItemChatCard
                  //     key={item.id}
                  //     titleImg={item.name}
                  //     imgSrc={item.images[0]}
                  //     category={item.category}
                  //     tags={item.tags}
                  //     // onPress={() =>
                  //     //   navigation.navigate('Chat', {name: 'Stamp Watcharin'})
                  //     // }
                  //   />
                ))
              : null} */}
          </ScrollView>
        ) : active === 2 ? (
          <ScrollView style={{paddingHorizontal: 20}}>
            {/* <ItemChatCard
            //   onPress={() =>
            //     navigation.navigate('Chat', {name: 'Stamp Watcharin'})
            //   }
            /> */}
          </ScrollView>
        ) : active === 3 ? (
          <ScrollView style={{paddingHorizontal: 20}}>
            {/* <ItemChatCard
            //   onPress={() =>
            //     navigation.navigate('Chat', {name: 'Stamp Watcharin'})
            //   }
            /> */}
          </ScrollView>
        ) : null}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <CustomText fontSize={30}>Logging out...</CustomText>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {flexDirection: 'row', marginTop: 20},
});

export default Profile;
