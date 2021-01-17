/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image, Alert} from 'react-native';
import {Button} from '../CustomStyledComponent/Button/CustomButton';
import {Colors, PantoneColor} from '../../utils/Colors';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {CustomText} from '../../components/CustomStyledComponent/Text';

export default ({navigate}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 20,
        position: 'relative',
        alignItems: 'flex-start',
      }}>
      <View
        style={{
          position: 'relative',
          alignItems: 'center',
          padding: 20,
        }}>
        <Image
          style={{height: 170, width: 130, borderRadius: 10}}
          source={require('../../assets/img/stamp.png')}
        />
        <View
          style={{
            position: 'absolute',
            zIndex: 1,
            bottom: 0,
            right: 0,
          }}>
          <Button
            width={40}
            height={40}
            px={10}
            py={10}
            onPress={() => navigate('SHARE')}
            rounded
            bg={Colors._indigo_500}>
            <FeatherIcon
              style={{alignSelf: 'center'}}
              color={Colors.white}
              name="edit-2"
              size={20}
            />
          </Button>
        </View>
      </View>
      <View style={{top: '18%'}}>
        <CustomText fontSize={16}>Pathomporn Pankaew</CustomText>
        <View style={{marginVertical: 5}}>
          <CustomText fontSize={14} color="#C7C7C7">
            @job25721
          </CustomText>
        </View>
        <CustomText color={Colors.black} fontWeight="500" fontSize={13}>
          <FeatherIcon color={Colors._red_500} name="map-pin" size={16} />
          Chiang Mai University
        </CustomText>
      </View>
    </View>
  );
};
