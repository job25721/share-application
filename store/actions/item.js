import {Alert} from 'react-native';
import {
  CLEAR_FORM,
  SET_SUBMIT_LOADING,
  SET_UPLOAD_STATE,
} from '../../utils/form/form-action-type';
import {ADD_ITEM} from '../types/item';
import storage from '@react-native-firebase/storage';
export const addNewItem = ({
  name,
  owner,
  images,
  tags,
  category,
  description,
  navigate,
  formDispatch,
}) => async (dispatch) => {
  if (
    images.length <= 0 ||
    name === '' ||
    category === null ||
    description === '' ||
    images.length < 0
  ) {
    Alert.alert('กรอกข้อมูลให้ครบ');
  } else {
    formDispatch({type: SET_SUBMIT_LOADING, payload: true});
    for (let i = 0; i < images.length; i++) {
      const imgPath = images[i];
      const filename = imgPath.substr(
        imgPath.lastIndexOf('/') + 1,
        imgPath.length,
      );
      const imgRef = storage().ref(`${owner.split(' ')[0]}/images/${filename}`);
      await imgRef.putFile(imgPath);
      formDispatch({type: SET_UPLOAD_STATE, payload: i + 1});
      console.log(await imgRef.getDownloadURL());
    }

    dispatch({
      type: ADD_ITEM,
      payload: {name, owner, images, tags, category, description},
    });
    formDispatch({type: SET_SUBMIT_LOADING, payload: false});
    dispatch({type: SET_UPLOAD_STATE, payload: 0});
    dispatch({type: CLEAR_FORM});
    navigate('Tab');
  }
};
