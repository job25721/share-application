/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors} from '../../utils/Colors';
import Tag from '../Home/Tag';
import {CustomText} from '../CustomStyledComponent/Text';
import {useSelector} from 'react-redux';

const ItemChatCard = ({onPress, title, imgSrc}) => {
  const items = useSelector((state) => state.item.feedItems);
  return (
    <TouchableOpacity onPress={onPress} style={[styles.chatListCard]}>
      <Image style={styles.img} source={imgSrc} />
      <View style={{width: '60%'}}>
        <CustomText fontWeight="500">{title}</CustomText>
        <CustomText>ประเภท: ของใช้</CustomText>
        <View style={{flexDirection: 'row', marginTop: 5}}>
          {[{text: 'จั ก ร ก ล'}, {text: 'ใ จ เ ก เ ร'}].map((item, i) => (
            <>
              <Tag key={item} text={item.text} />
            </>
          ))}
        </View>
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

export {ItemChatCard};
