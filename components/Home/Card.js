/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {useState} from 'react/cjs/react.development';
import Tag from './Tag';
import {Button} from '../CustomStyledComponent/Button/CustomButton';
import {CustomText} from '../CustomStyledComponent/Text';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const imgUrl = require('../../assets/img/cat.jpg');

export const Card = ({name, title, tag, img}) => {
  const {navigate} = useNavigation();
  const [tagArr, setTag] = useState([]);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    tag ? setTag(tag) : setTag([]);
  }, [tag]);
  return (
    <>
      <TouchableOpacity
        style={cardStyles.card}
        onPress={() => navigate('Detail', {title, img})}>
        <Image
          style={cardStyles.img}
          source={img && img !== '' ? img : imgUrl}
        />
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
              {/* <CustomText
                fontWeight="500"
                fontSize={12}
                color={PantoneColor.blueDepths}>
                <FeatherIcon color={Colors._red_500} name="map-pin" size={16} />
                Chiang Mai University
              </CustomText> */}
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
          <View style={{alignItems: 'flex-end'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <CustomText>{!saved ? 'Whishlist' : 'บันทึกแล้ว'}</CustomText>
              <Button px={0}>
                {!saved ? (
                  <FeatherIcon
                    onPress={() => setSaved(true)}
                    name="bookmark"
                    size={30}
                  />
                ) : (
                  <MaterialCommunityIcons
                    onPress={() => setSaved(false)}
                    name="bookmark"
                    size={31}
                  />
                )}
              </Button>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
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
    marginVertical: 10,
    justifyContent: 'center',
  },
});
