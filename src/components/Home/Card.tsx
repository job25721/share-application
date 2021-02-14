/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';

import Tag from './Tag';
import {Button, CustomText, ProgressiveImage} from '../custom-components';

import FeatherIcon from 'react-native-vector-icons/Feather';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Item} from '../../store/item/types';
import {useNavigation} from '@react-navigation/native';
import {getFullDate, getTime} from '../../utils/getTime';
import {useMutation} from '@apollo/client';
import {
  ADD_WISHLIST_ITEM,
  REMOVE_WISHLIST_ITEM,
} from '../../graphql/mutation/user';

import {useDispatch} from '../../store';

interface CardProps {
  item: Item;
  isSaved: boolean;
}

export const Card: React.FC<CardProps> = ({item, isSaved}) => {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const [AddNewBookmark] = useMutation(ADD_WISHLIST_ITEM);
  const [RemoveBookmark] = useMutation(REMOVE_WISHLIST_ITEM);
  const [saved, setSaved] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setSaved(isSaved);
  }, [isSaved]);

  const addToWishlist = async () => {
    try {
      setLoading(true);
      const res = await AddNewBookmark({
        variables: {
          itemId: item.id,
        },
      });
      if (res.errors) {
        throw res.errors;
      }
      dispatch({type: 'ADD_MY_SAVED_ITEM', payload: item});
      setLoading(false);
    } catch (err) {
      dispatch({type: 'REMOVE_SAVED_ITEM', payload: item.id});
      console.log(err);
    }
  };

  const removeWishlist = async () => {
    try {
      setLoading(true);
      const res = await RemoveBookmark({
        variables: {
          itemId: item.id,
        },
      });
      if (res.errors) {
        throw res.errors;
      }
      dispatch({type: 'REMOVE_SAVED_ITEM', payload: item.id});
      setLoading(false);
    } catch (err) {
      dispatch({type: 'ADD_MY_SAVED_ITEM', payload: item});
      console.log(err);
    }
  };

  const {
    id,
    name,
    owner,
    tags,
    images,
    category,
    description,
    createdDate,
  } = item;
  return (
    <>
      <TouchableOpacity
        style={cardStyles.card}
        onPress={() => {
          const itemData = {
            id,
            name,
            owner,
            tags,
            category,
            description,
            images,
          };
          navigate('Detail', {itemData, wishlist: saved});
          console.log('send params');
          console.log(itemData);
        }}>
        <ProgressiveImage
          style={cardStyles.img}
          resizeMode="cover"
          loadingType="loadingMotion"
          source={
            images[0] !== ''
              ? {uri: images[0]}
              : require('../../assets/img/cat.jpg')
          }
        />
        <View style={cardStyles.content}>
          <View style={cardStyles.userInfo}>
            <Image style={cardStyles.userImg} source={{uri: owner.avatar}} />
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
            <CustomText>
              {getFullDate(new Date(createdDate).getTime())} เวลา{' '}
              {getTime(new Date(createdDate).getTime())}
            </CustomText>
          </View>
          <CustomText>ประเภท : {category}</CustomText>
          <View style={cardStyles.tagContainer}>
            {tags.map((tag, i) => (
              <Tag key={i} text={tag} />
            ))}
          </View>

          <View style={cardStyles.userOptions}>
            <View style={cardStyles.btnOptionsView}>
              <CustomText>
                {(!saved && !loading && 'Wishlist') ||
                  (!loading && 'บันทึกแล้ว')}
              </CustomText>
              {(!saved && !loading && (
                <Button px={0} onPress={addToWishlist}>
                  <FeatherIcon name="bookmark" size={30} />
                </Button>
              )) ||
                (!loading && (
                  <Button px={0} onPress={removeWishlist}>
                    <MaterialCommunityIcons name="bookmark" size={31} />
                  </Button>
                ))}
              {loading ? (
                <Image
                  style={{width: 60, height: 60}}
                  source={require('../../assets/img/loadingIndicator/ball.gif')}
                />
              ) : null}
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
    height: 570,
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
    marginVertical: 5,
  },
  content: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: '55%',
    // justifyContent: 'space-evenly',
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
