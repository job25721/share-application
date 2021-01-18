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
import ImagePreviewModal from '../components/ImagePreviewModal';
import {SET_IMAGE_PREVIEW} from '../utils/form/form-action-type';

export const FormContext = createContext({});

const NewItem = ({navigation}) => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [cancelAlert, setCancelAlert] = useState(false);
  return (
    <FormContext.Provider value={{state, dispatch}}>
      <SafeAreaView style={styles.container}>
        <ImagePreviewModal
          open={state.imagePreviewOpen}
          onClosed={() => dispatch({type: SET_IMAGE_PREVIEW, payload: false})}
          images={state.images}
        />
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
              setCancelAlert(true);
            }}>
            <FeatherIcon color={Colors._red_600} name="x" size={30} />
          </Button>
          <CustomText fontSize={20}>Cancel</CustomText>
        </View>
        <NewItemfForm />
      </SafeAreaView>
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
  container: {backgroundColor: Colors.white, flex: 1},
});

export default NewItem;
