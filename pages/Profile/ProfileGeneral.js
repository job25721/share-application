/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, ScrollView} from 'react-native';
import Profile from '../../components/Profile/ProfileImage';
import IconList from '../../components/Profile/IconList';
export default (props) => {
  return (
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
    </View>
  );
};
