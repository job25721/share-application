/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, ScrollView} from 'react-native';
import {CustomText} from '../components/CustomStyledComponent/Text';
import Profile from '../components/Profile/ProfileImage';
import CardList from '../components/Home/CardList';
export default (props) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Profile />
      <CustomText fontSize={24}>Pathomporn Pankaew</CustomText>
      <View style={{marginVertical: 5}}>
        <CustomText color="#C7C7C7">@job25721</CustomText>
      </View>
      <CustomText color="#C7C7C7">Chiang Mai University</CustomText>
      <View style={{alignItems: 'center', marginVertical: 30}}>
        <CustomText fontSize={22} fontWeight="bold">
          408
        </CustomText>
        <CustomText fontSize={22} fontWeight="bold">
          POST
        </CustomText>
      </View>
      <ScrollView horizontal style={{height: 230, width: 350}}>
        {[1, 2, 3, 4].map((item) => (
          <CardList key={item} />
        ))}
      </ScrollView>
    </View>
  );
};
