/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {CustomText} from '../../components/CustomStyledComponent/Text';
import {Colors} from '../../utils/Colors';

export default () => {
  return (
    <View style={styles.container}>
      <View style={styles.cardCSS}>
        <Image
          style={styles.imageCSS}
          source={require('../../assets/img/stamp.png')}
        />
        <View style={{marginLeft: 10}}>
          <CustomText fontSize={16}>You have the message from</CustomText>
          <CustomText fontSize={16} fontWeight={'bold'}>
            Pathomporn Pankaew
          </CustomText>
          <View style={{marginTop: 20}}>
            <CustomText fontSize={14} color={Colors._color_gray_400}>
              9.18 PM
            </CustomText>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  imageCSS: {
    height: 80,
    width: 80,
    borderRadius: 50,
    alignSelf: 'center',
  },
  cardCSS: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 15,
    borderRadius: 20,
  },
});
