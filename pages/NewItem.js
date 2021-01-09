import React from 'react';

import NewItemfForm from '../components/NewItem/Form';
import {DismissKeyboard} from '../components/CustomStyledComponent/DismissKeyboard';
import {SafeAreaView} from 'react-native';

const NewItem = (props) => {
  return (
    <DismissKeyboard>
      <SafeAreaView style={{flex: 1}}>
        <NewItemfForm />
      </SafeAreaView>
    </DismissKeyboard>
  );
};

export default NewItem;
