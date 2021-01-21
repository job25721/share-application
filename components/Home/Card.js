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

const defaultImg = require('../../assets/img/cat.jpg');

export const Card = ({name, owner, tags, images, category, description}) => {
  const {navigate} = useNavigation();
  const [tagArr, setTag] = useState([]);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    tags ? setTag(tags) : setTag([]);
  }, [tags]);
  return (
    <>
      <TouchableOpacity
        style={cardStyles.card}
        onPress={() => {
          const itemData = {
            name,
            owner: owner.info,
            tags,
            category,
            description,
            images,
            bookmarked: saved,
          };
          navigate('Detail', itemData);
        }}>
        <Image
          style={cardStyles.img}
          resizeMethod="scale"
          resizeMode="cover"
          source={images && images[0] !== '' ? {uri: images[0]} : defaultImg}
        />
        <View style={cardStyles.content}>
          <View style={cardStyles.userInfo}>
            <Image
              style={cardStyles.userImg}
              source={require('../../assets/img/stamp.png')}
            />
            <View style={{paddingHorizontal: 15}}>
              <CustomText fontWeight="500">
                {owner.info.firstName} {owner.info.lastName}
              </CustomText>
            </View>
          </View>
          <View>
            <CustomText fontWeight="bold" fontSize={20}>
              {name}
            </CustomText>
          </View>
          <CustomText>ประเภท : {category}</CustomText>
          <View style={cardStyles.tagContainer}>
            {tagArr.map((tag, i) => (
              <Tag key={i} text={tag} />
            ))}
          </View>

          <View style={cardStyles.userOptions}>
            <View style={cardStyles.btnOptionsView}>
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
    height: 450,
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
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '30%',
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
    marginVertical: 5,
  },
  userOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  btnOptionsView: {flexDirection: 'row', alignItems: 'center'},
});
