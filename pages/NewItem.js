import React from 'react';

import NewItemfForm from '../components/NewItem/Form';
import {DismissKeyboard} from '../components/CustomStyledComponent/DismissKeyboard';
import {SafeAreaView, View, Alert} from 'react-native';
import {Button} from '../components/CustomStyledComponent/Button/CustomButton';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {CustomText} from '../components/CustomStyledComponent/Text';
import {Colors, PantoneColor} from '../utils/Colors';

const NewItem = ({navigation}) => {
  return (
    <DismissKeyboard>
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
        <View
          style={{
            marginLeft: 10,
            marginTop: 10,
          }}>
          <Button
            px={0}
            onPress={() => {
              Alert.alert('Warning', 'ข้อมูลที่คุณกรอกจะหายไปทั้งหมด', [
                {text: 'ตกลง', onPress: () => navigation.goBack()},
                {text: 'ยกเลิก'},
              ]);
            }}>
            <View style={{flexDirection: 'row'}}>
              <FeatherIcon
                color={Colors._red_500}
                style={{paddingRight: 10}}
                name="arrow-left"
                size={30}
              />
              <CustomText fontSize={20}>Cancel</CustomText>
            </View>
          </Button>
        </View>

        <NewItemfForm />
      </SafeAreaView>
    </DismissKeyboard>
  );
};

export default NewItem;
