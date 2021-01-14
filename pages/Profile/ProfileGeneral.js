/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, ScrollView} from 'react-native';
import Profile from '../../components/Profile/ProfileImage';
import IconList from '../../components/Profile/IconList';
import CardList from '../../components/Home/CardList';
import {CustomText} from '../../components/CustomStyledComponent/Text';
export default (props) => {
  return (
    <ScrollView style={{flex: 1}}>
      <View>
        <Profile navigate={props.navigation.navigate} />
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
        <View
          style={{
            alignItems: 'center',
            marginVertical: 30,
          }}>
          <CustomText fontSize={22} fontWeight="bold">
            48
          </CustomText>
          <CustomText fontSize={22} fontWeight="bold">
            POST
          </CustomText>
        </View>
        <ScrollView
          horizontal
          style={{height: 230, width: '95%', alignSelf: 'center'}}>
          {[1, 2, 3, 4].map((item) => (
            <CardList key={item} />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};
