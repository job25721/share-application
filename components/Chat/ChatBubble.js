/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from '../CustomStyledComponent/Colors';
import {CustomText} from '../CustomStyledComponent/Text';

export default ({msg, pos, time}) => {
  return msg ? (
    <View
      style={[
        bubbleStyles.container,
        pos === 'left' ? bubbleStyles.left : bubbleStyles.right,
      ]}>
      <View
        style={[
          pos === 'left' ? bubbleStyles.msgLeft : bubbleStyles.msgRight,
          bubbleStyles.msgContainer,
        ]}>
        {msg.map((m, i) => (
          <CustomText
            fontSize={17}
            color={pos === 'left' ? Colors.black : Colors.white}
            key={i}>
            {m}
          </CustomText>
        ))}
      </View>
      <View style={{paddingHorizontal: 5}}>
        <CustomText fontSize={12} textAlign={pos === 'left' ? 'right' : 'left'}>
          {new Date().getHours() + ':' + new Date().getMinutes() + ' PM'}
        </CustomText>
      </View>
    </View>
  ) : null;
};

const bubbleStyles = StyleSheet.create({
  container: {
    maxWidth: '70%',
    marginVertical: 5,
    alignItems: 'flex-end',
  },
  msgContainer: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
  },
  msgLeft: {
    backgroundColor: Colors._gray_900,
    // borderColor: 'grey',
    // borderWidth: 0.25,
  },
  msgRight: {
    backgroundColor: Colors._indigo_500,
  },
  left: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  right: {
    flexDirection: 'row-reverse',
    alignSelf: 'flex-end',
  },
});
