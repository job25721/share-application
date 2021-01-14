/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, ScrollView} from 'react-native';
import {CustomText} from '../../components/CustomStyledComponent/Text';
import {Colors, PantoneColor} from '../../utils/Colors';
import Profile from '../../components/Profile/ProfileImage';
import CardList from '../../components/Home/CardList';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
export default (props) => {
  return (
    <ScrollView style={{flex: 1}}>
      <View style={{alignItems: 'center'}}>
        <Profile navigate={props.navigation.navigate} />
        <CustomText fontSize={24}>Pathomporn Pankaew</CustomText>
        <View style={{marginVertical: 5}}>
          <CustomText color="#C7C7C7">@job25721</CustomText>
        </View>
        <CustomText color="#C7C7C7">Chiang Mai University</CustomText>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              alignItems: 'center',
              marginVertical: 30,
            }}>
            <CustomText fontSize={22} fontWeight="bold">
              408
            </CustomText>
            <CustomText fontSize={22} fontWeight="bold">
              POST
            </CustomText>
          </View>
          <AwesomeIcon
            style={{
              color: PantoneColor.livingCoral,
              position: 'absolute',
              left: 150,
              alignSelf: 'center',
            }}
            name="chevron-circle-right"
            size={35}
          />
        </View>
        <ScrollView horizontal style={{height: 230, width: '95%'}}>
          {[1, 2, 3, 4].map((item) => (
            <CardList key={item} />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};
