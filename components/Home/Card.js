/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {useState} from 'react/cjs/react.development';
import Tag from './Tag';
import {Button} from '../CustomStyledComponent/Button/CustomButton';
import {Colors} from '../../utils/Colors';
import {CustomText} from '../CustomStyledComponent/Text';

const imgUrl = require('../../assets/img/cat.jpg');

export const Card = ({name, title, tag, img, navigate}) => {
  const [tagArr, setTag] = useState([]);
  useEffect(() => {
    tag ? setTag(tag) : setTag([]);
  }, [tag]);
  return (
    <View style={cardStyles.card}>
      <Image style={cardStyles.img} source={img && img !== '' ? img : imgUrl} />
      <View style={cardStyles.content}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', height: '25%'}}>
          <Image
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
            }}
            source={require('../../assets/img/stamp.png')}
          />
          <View style={{paddingHorizontal: 15}}>
            <CustomText fontWeight="500" fontSize={18}>
              {name}
            </CustomText>
          </View>
        </View>
        <View>
          <CustomText fontWeight="bold" fontSize={20}>
            {title}
          </CustomText>
        </View>
        <View style={cardStyles.tagContainer}>
          {tagArr.map((item) => (
            <Tag key={item} text={item} />
          ))}
        </View>
        <View style={cardStyles.btnView}>
          <Button
            rounded
            text="ส่งคำขอ"
            bg={Colors._indigo_500}
            color={Colors.white}
            onPress={() => navigate('Chat', {name})}
          />
          <Button
            rounded
            text="ดูรายละเอียด"
            bg={Colors._gray_900}
            color={Colors.black}
            onPress={() => navigate('Detail', {title, img})}
          />
        </View>
      </View>
    </View>
  );
};

export const cardStyles = StyleSheet.create({
  card: {
    width: '94%',
    height: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    backgroundColor: '#fff',
    elevation: 3,
    borderRadius: 15,
    marginBottom: '5%',
  },
  img: {
    width: '100%',
    height: '45%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  content: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: '55%',
    justifyContent: 'space-evenly',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  btnView: {
    flexDirection: 'row',
    marginVertical: 2.5,
  },
});
