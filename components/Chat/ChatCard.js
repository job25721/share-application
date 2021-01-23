/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Image, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors} from '../../utils/Colors';

import {CustomText} from '../CustomStyledComponent/Text';

const ItemChatCard = ({
  onPress,
  title,
  notification,
  lastestMsg,
  imgSrc,
  owner,
  type,
}) => {
  const [isNoti, setNoti] = useState(false);
  const [lastest, setLastest] = useState(null);
  useEffect(() => {
    if (notification && notification > 0) {
      setNoti(true);
    } else {
      setNoti(false);
    }
  }, [notification]);

  useEffect(() => {
    setLastest(lastestMsg);
  }, [lastestMsg]);

  return (
    <TouchableOpacity onPress={onPress} style={[styles.chatListCard]}>
      <Image style={styles.img} source={{uri: imgSrc}} />
      <View style={{width: '60%'}}>
        <CustomText fontWeight="500">{title}</CustomText>
        {type === 'Person' ? null : <CustomText>เจ้าของ {owner}</CustomText>}
        <View>
          {lastest ? (
            <CustomText
              fontWeight={isNoti ? 'bold' : 'normal'}
              fontSize={15}
              color={
                notification && notification > 0
                  ? Colors.black
                  : 'rgb(75, 85, 99)'
              }>
              {lastest.from} :{' '}
              {lastest.msg.length > 14
                ? lastest.msg.substr(0, 14) + '....'
                : lastest.msg}
            </CustomText>
          ) : null}
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

const ItemCardAbstract = ({onPress, title, notification, imgSrc}) => {
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

const styles = StyleSheet.create({
  notiBadge: {
    backgroundColor: Colors._red_400,
    justifyContent: 'center',
    borderRadius: 50,
    height: 50,
    width: 50,
  },
  chatListCard: {
    backgroundColor: Colors._gray_900,
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

export {ItemChatCard, ItemCardAbstract};
