import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Colors} from '../components/CustomStyledComponent/Colors';
import {CustomText} from '../components/CustomStyledComponent/Text';

export default () => {
  return (
    <View style={styles.container}>
      <CustomText color={Colors.white} fontWeight="700" fontSize={12}>
        นายปริญญา สีตะวัน
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '40%',
    backgroundColor: Colors._indigo_300,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 5,
  },
});
