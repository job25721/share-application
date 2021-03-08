/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Alert} from 'react-native';

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

import {RootState, useDispatch} from '../../store';
import {useSelector} from 'react-redux';
import {SliderBox} from '../react-native-image-slider-box';
import {PantoneColor} from '../../utils/Colors';

interface CardProps {
  item: Item;
  isSaved: boolean;
}

export const Card: React.FC<CardProps> = ({item, isSaved}) => {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.userData);
  const [AddNewBookmark] = useMutation(ADD_WISHLIST_ITEM);
  const [RemoveBookmark] = useMutation(REMOVE_WISHLIST_ITEM);
  const [saved, setSaved] = useState<boolean>(false);
  const [liked, setliked] = useState<boolean>(false);
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

  const {name, owner, tags, images, category, createdDate} = item;

  return (
    <>
      <TouchableOpacity
        style={cardStyles.card}
        onPress={() => navigate('Detail', {item, wishlist: saved})}>
        <View style={cardStyles.userInfo}>
          <TouchableOpacity onPress={() => Alert.alert(owner.info.firstName)}>
            <ProgressiveImage
              loadingType="spinner"
              style={cardStyles.userImg}
              source={{uri: owner.avatar}}
            />
          </TouchableOpacity>

          <View style={{paddingHorizontal: 15}}>
            <CustomText fontSize={17} fontWeight="500">
              {owner.info.firstName} {owner.info.lastName}
            </CustomText>
            <CustomText fontSize={13}>
              {getFullDate(new Date(createdDate).getTime())}{' '}
              {getTime(new Date(createdDate).getTime())}
            </CustomText>
          </View>
        </View>
        {/* <ProgressiveImage
          style={cardStyles.img}
          resizeMode="cover"
          loadingType="loadingMotion"
          source={
            images[0] !== ''
              ? {uri: images[0]}
              : require('../../assets/img/cat.jpg')
          }
        /> */}
        <SliderBox
          dotColor={PantoneColor.livingCoral}
          TouchableHighlight="#fff"
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            padding: 0,
            margin: 0,
            backgroundColor: 'rgba(128, 128, 128, 0.92)',
          }}
          onCurrentImagePressed={() =>
            navigate('Detail', {item, wishlist: saved})
          }
          paginationBoxVerticalPadding={20}
          sliderBoxHeight={300}
          images={images}
        />
        <View style={cardStyles.content}>
          <View style={cardStyles.btnOptionsView}>
            <View>
              <Button px={0} py={0} onPress={() => setliked(!liked)}>
                {liked ? (
                  <MaterialCommunityIcons name="heart" size={24} />
                ) : (
                  <FeatherIcon name="heart" size={22} />
                )}
              </Button>
            </View>

            {user?.id !== item.owner.id && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  flex: 1,
                  // position: 'absolute',
                  // right: 0,
                  // top: 10,
                }}>
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
            )}
          </View>
          {/* <CustomText>145 Likes</CustomText> */}
          <View>
            <CustomText fontWeight="bold" fontSize={20}>
              {name}
            </CustomText>
          </View>
          <CustomText>ประเภท : {category}</CustomText>
          <View style={cardStyles.tagContainer}>
            {tags.map((tag, i) => (
              <Tag key={i} text={tag} />
            ))}
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export const cardStyles = StyleSheet.create({
  card: {
    width: '100%',
    height: 570,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    backgroundColor: '#fff',
    elevation: 2,
    borderRadius: 15,
    marginBottom: '5%',
  },
  img: {
    width: '100%',
    // height: 300,
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 15,
  },
  userImg: {
    width: 45,
    height: 45,
    borderRadius: 50,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
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
  btnOptionsView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
