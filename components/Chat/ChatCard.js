/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Image, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors, PantoneColor} from '../../utils/Colors';

import {CustomText} from '../CustomStyledComponent/Text';

const ItemChatCard = ({onPress, title, notification, lastedMsg, imgSrc}) => {
  const [isNoti, setNoti] = useState(false);
  useEffect(() => {
    if (notification && notification > 0) {
      setNoti(true);
    } else {
      setNoti(false);
    }
  }, [notification]);
  return (
    <TouchableOpacity onPress={onPress} style={[styles.chatListCard]}>
      <Image style={styles.img} source={imgSrc} />
      <View style={{width: '60%'}}>
        <CustomText fontWeight="500">{title}</CustomText>
        <CustomText>เจ้าของ Pathomporn</CustomText>
        <View>
          <CustomText
            fontWeight={isNoti ? 'bold' : 'normal'}
            fontSize={15}
            color={
              notification && notification > 0
                ? Colors.black
                : 'rgb(75, 85, 99)'
            }>
            Stamp : ได้ครับ
          </CustomText>
        </View>
      </View>
      <View
        style={[
          styles.notiBadge,
          !isNoti ? {backgroundColor: 'transparent'} : null,
        ]}>
        {isNoti ? (
          <CustomText textAlign="center" color={Colors.white}>
            {notification}
          </CustomText>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const PersonChatCard = ({onPress, name}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.chatListCard}>
      <Image style={styles.img} source={require('../../assets/img/cat.jpg')} />
      <View style={{width: '60%'}}>
        <CustomText fontWeight="500">{name}</CustomText>
      </View>
      <View style={styles.notiBadge}>
        <CustomText textAlign="center" color={Colors.white}>
          10
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  notiBadge: {
    backgroundColor: Colors._red_400,
    justifyContent: 'center',
    borderRadius: 50,
    height: 50,
    width: 50,
  },
  chatListCard: {
    backgroundColor: PantoneColor.limpetShell,
    borderRadius: 25,
    padding: 10,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    justifyContent: 'space-evenly',
    shadowColor: Colors.black,
  },
  img: {
    width: 55,
    height: 55,
    borderRadius: 50,
    marginHorizontal: 10,
  },
});

export {ItemChatCard, PersonChatCard};
