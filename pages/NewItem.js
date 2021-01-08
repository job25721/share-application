import React from 'react';

import NewItemfForm from '../components/NewItem/Form';
import {DismissKeyboard} from '../components/CustomStyledComponent/DismissKeyboard';

const NewItem = (props) => {
  return (
    <DismissKeyboard>
      <NewItemfForm />
    </DismissKeyboard>
  );
};

export default NewItem;
