import React from 'react';

import NewItemfForm from '../components/NewItem/Form';
import {DismissKeyboard} from '../components/CustomStyledComponent/DismissKeyboard';
import {SafeAreaView, View} from 'react-native';
import {Button} from '../components/CustomStyledComponent/Button/CustomButton';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {CustomText} from '../components/CustomStyledComponent/Text';
import {Colors, PantoneColor} from '../utils/Colors';

const NewItem = ({navigation}) => {
  return (
    <DismissKeyboard>
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
        <Button onPress={() => navigation.goBack()}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FeatherIcon
              color={Colors._red_500}
              style={{paddingRight: 10}}
              name="x"
              size={30}
            />
            <CustomText>Cancel</CustomText>
          </View>
        </Button>
        <CustomText
          fontSize={35}
          color={PantoneColor.livingCoral}
          textAlign="center"
          fontWeight="bold"
          spacing={5}>
          LET'S SHARE
        </CustomText>
        <NewItemfForm />
      </SafeAreaView>
    </DismissKeyboard>
  );
};

export default NewItem;
