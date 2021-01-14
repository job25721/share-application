/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, ScrollView} from 'react-native';
import Profile from '../../components/Profile/ProfileImage';
import {ItemChatCard} from '../../components/Chat/ChatCard';
import IconList from '../../components/Profile/IconList';

export default (props) => {
  const {navigation} = props;
  return (
    <>
      <View style={{alignItems: 'center', flex: 1}}>
        <Profile />
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            {[
              {
                nameIcon: 'user',
                text: 'เสื้อผ้า',
              },
              {
                nameIcon: 'arrow-down-left',
                text: 'กำลังส่ง',
              },
              {
                nameIcon: 'arrow-up-right',
                text: 'รับต่อมา',
              },
              {
                nameIcon: 'user-check',
                text: 'ส่งต่อแล้ว',
              },
            ].map((item, i) => (
              <IconList key={i} text={item.text} nameIcon={item.nameIcon} />
            ))}
          </View>
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
