import React, {createContext, useReducer} from 'react';

import NewItemfForm from '../components/NewItem/Form';
import {DismissKeyboard} from '../components/CustomStyledComponent/DismissKeyboard';
import {SafeAreaView, View, Alert, StyleSheet, Platform} from 'react-native';
import {Button} from '../components/CustomStyledComponent/Button/CustomButton';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {CustomText} from '../components/CustomStyledComponent/Text';
import {Colors} from '../utils/Colors';
import TypePickerModal from '../components/NewItem/TypePickerIOS/TypePickerModal';
import {formReducer, initialState} from '../utils/form/form-reducer';

export const FormContext = createContext({});

const NewItem = ({navigation}) => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  return (
    <FormContext.Provider value={{state, dispatch}}>
      <DismissKeyboard>
        <SafeAreaView style={styles.container}>
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
              <FeatherIcon color={Colors._red_600} name="x" size={30} />
            </Button>
            <CustomText fontSize={20}>Cancel</CustomText>
          </View>
          <NewItemfForm />
        </SafeAreaView>
      </DismissKeyboard>
    </FormContext.Provider>
  );
};

const styles = StyleSheet.create({
  backBtnView: {
    marginLeft: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {flex: 1, backgroundColor: Colors.white},
});

export default NewItem;
