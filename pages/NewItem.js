import React, {createContext, useReducer, useState} from 'react';
import {SafeAreaView, View, StyleSheet, Platform} from 'react-native';

import NewItemfForm from '../components/NewItem/Form';
import TypePickerModal from '../components/NewItem/TypePickerIOS/TypePickerModal';
import {DismissKeyboard} from '../components/CustomStyledComponent/DismissKeyboard';
import {Button} from '../components/CustomStyledComponent/Button/CustomButton';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {CustomText} from '../components/CustomStyledComponent/Text';
import {Colors} from '../utils/Colors';
import {formReducer, initialState} from '../utils/form/form-reducer';
import AlertDialog from '../components/AlertDialog';

export const FormContext = createContext({});

const NewItem = ({navigation}) => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [cancelAlert, setCancelAlert] = useState(false);
  return (
    <FormContext.Provider value={{state, dispatch}}>
      <DismissKeyboard>
        <SafeAreaView style={styles.container}>
          <AlertDialog
            title="Warning"
            content="ข้อมูลที่คุณกรอกจะหายไปทั้งหมด"
            open={cancelAlert}
            onClosePress={() => setCancelAlert(false)}
            cancelText="กรอกต่อ"
            onConfirm={() => {
              setCancelAlert(false);
              navigation.goBack();
            }}
          />
          {Platform.OS === 'ios' ? <TypePickerModal /> : null}
          <View style={styles.backBtnView}>
            <Button
              px={0}
              onPress={() => {
                // Alert.alert('Warning', 'ข้อมูลที่คุณกรอกจะหายไปทั้งหมด', [
                //   {text: 'ตกลง', onPress: () => navigation.goBack()},
                //   {text: 'ยกเลิก'},
                // ]);
                setCancelAlert(true);
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
