/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors, PantoneColor} from '../../utils/Colors';
import {Button, CustomText} from '../custom-components';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';

export const IconList: React.FC<{nameIcon: string; text: string}> = ({
  nameIcon,
  text,
}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <View style={styles.container}>
        <Button px={0} mx={0}>
          <AwesomeIcon color={Colors.white} name={nameIcon} size={35} />
        </Button>
      </View>
      <CustomText fontSize={16} color={PantoneColor.livingCoral}>
        {text}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 50,
    backgroundColor: PantoneColor.livingCoral,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: 80,
    marginBottom: 10,
  },
});
