/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, ScrollView} from 'react-native';
import {CustomText} from '../../components/CustomStyledComponent/Text';
import Profile from '../../components/Profile/ProfileImage';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import {PantoneColor} from '../../utils/Colors';
import {ItemChatCard} from '../../components/Chat/ChatCard';

export default (props) => {
  const {navigation} = props;
  return (
    <>
      <View style={{alignItems: 'center', flex: 1}}>
        <Profile />
        <CustomText fontSize={24}>Pathomporn Pankaew</CustomText>
        <View style={{marginVertical: 5}}>
          <CustomText color="#C7C7C7">@job25721</CustomText>
        </View>
        <CustomText color="#C7C7C7">Chiang Mai University</CustomText>
        <View style={{flexDirection: 'row'}}>
          <AwesomeIcon
            style={{
              color: PantoneColor.livingCoral,
              position: 'absolute',
              right: 180,
              alignSelf: 'center',
            }}
            name="chevron-circle-left"
            size={35}
          />
          <View style={{alignItems: 'center', marginVertical: 30}}>
            <CustomText fontSize={22}>ของที่กำลังส่งต่อ</CustomText>
          </View>
          <AwesomeIcon
            style={{
              color: PantoneColor.livingCoral,
              position: 'absolute',
              left: 180,
              alignSelf: 'center',
            }}
            name="chevron-circle-right"
            size={35}
          />
        </View>
        <ScrollView style={{width: 350, marginBottom: 40}}>
          {[
            {
              title: 'กระเป๋า anello (เจ้าของ Stamp)',
              img: require('../../assets/img/bag.jpg'),
            },
            {
              title: 'อาจารย์แดง (เจ้าของ Job)',
              img: require('../../assets/img/dang.jpg'),
            },
            {
              title: 'น้องแมว (เจ้าของ Job)',
              img: require('../../assets/img/cat.jpg'),
            },
          ].map((item, i) => (
            <ItemChatCard
              key={i}
              title={item.title}
              imgSrc={item.img}
              notification={2}
              onPress={() =>
                navigation.navigate('Chat', {name: 'Stamp Watcharin'})
              }
            />
          ))}
        </ScrollView>
      </View>
    </>
  );
};
