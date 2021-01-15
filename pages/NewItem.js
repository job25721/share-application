import React, {createContext, useState} from 'react';

import NewItemfForm from '../components/NewItem/Form';
import {DismissKeyboard} from '../components/CustomStyledComponent/DismissKeyboard';
import {SafeAreaView, View, Alert, StyleSheet, Platform} from 'react-native';
import {Button} from '../components/CustomStyledComponent/Button/CustomButton';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {CustomText} from '../components/CustomStyledComponent/Text';
import {Colors} from '../utils/Colors';
import TypePickerModal from '../components/NewItem/TypePickerModal';

export const ModalContext = createContext({});

const NewItem = ({navigation}) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <DismissKeyboard>
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
        <ModalContext.Provider value={{modalOpen, setModalOpen}}>
          {Platform.OS === 'ios' ? <TypePickerModal /> : null}
          <View style={styles.backBtnView}>
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
        </ModalContext.Provider>
      </SafeAreaView>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  backBtnView: {
    marginLeft: 10,
    marginTop: 10,
  },
});

export default NewItem;
