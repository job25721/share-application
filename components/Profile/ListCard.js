/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, ScrollView} from 'react-native';
import {ItemChatCard} from '../../components/Chat/ChatCard';

export default (props) => {
  const {navigation} = props;
  return (
    <>
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
          lastestMsg={{from: 'Stamp Watcharin', msg: 'เบิ้มๆหน่ะ'}}
          notification={2}
          onPress={() => navigation.navigate('Chat', {name: 'Stamp Watcharin'})}
        />
        // <CustomText>hello</CustomText>
      ))}
    </>
  );
};
