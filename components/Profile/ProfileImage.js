/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image, Alert} from 'react-native';
import {Button} from '../CustomStyledComponent/Button/CustomButton';
import {Colors} from '../../utils/Colors';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default ({navigate}) => {
  return (
    <View
      style={{
        padding: 20,
        position: 'relative',
        alignItems: 'center',
      }}>
      <View
        style={{
          position: 'relative',
          alignItems: 'center',
          width: 125,
          height: 130,
          padding: 20,
        }}>
        <View
          style={{
            position: 'absolute',
            zIndex: 1,
            alignSelf: 'flex-start',
          }}>
          <Button
            width={40}
            height={40}
            px={10}
            py={10}
            onPress={() => navigate('Chat', {name: 'Pathomporn Pankaew'})}
            rounded
            bg={Colors._indigo_500}>
            <FeatherIcon
              style={{alignSelf: 'center'}}
              color={Colors.white}
              name="message-square"
              size={20}
            />
          </Button>
        </View>
        <Image
          style={{height: 100, width: 100, borderRadius: 50}}
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
            onPress={() => navigate('NewItem')}
            rounded
            bg={Colors._indigo_500}>
            <FeatherIcon
              style={{alignSelf: 'center'}}
              color={Colors.white}
              name="plus"
              size={20}
            />
          </Button>
        </View>
      </View>
    </View>
  );
};
