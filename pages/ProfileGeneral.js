/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import Profile from '../components/Profile/ProfileImage';
import IconList from '../components/Profile/IconList';
import CardList from '../components/Home/CardList';
import {CustomText} from '../components/CustomStyledComponent/Text';
import {Colors} from '../utils/Colors';
export default (props) => {
  const [active, setActive] = useState(0);
  return (
    <ScrollView style={{flex: 1, backgroundColor: Colors.white}}>
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
          <CustomText>1</CustomText>
        ) : active === 1 ? (
          <CustomText>2</CustomText>
        ) : null}

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