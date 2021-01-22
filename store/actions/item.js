import {Alert} from 'react-native';
import {
  CLEAR_FORM,
  SET_SUBMIT_LOADING,
  SET_UPLOAD_STATE,
} from '../../utils/form/form-action-type';
import {ADD_ITEM} from '../types/item';
import storage from '@react-native-firebase/storage';
export const addNewItemForm = ({
  name,
  owner,
  images,
  tags,
  category,
  description,
  navigate,
  formDispatch,
  addItemMutation,
}) => async (dispatch) => {
  if (
    images.length > 0 &&
    name !== '' &&
    category !== null &&
    description !== ''
  ) {
    console.log(owner);
    formDispatch({type: SET_SUBMIT_LOADING, payload: true});
    const fireBaseImgURL = [];
    for (let i = 0; i < images.length; i++) {
      const imgPath = images[i];
      const filename = imgPath.substr(
        imgPath.lastIndexOf('/') + 1,
        imgPath.length,
      );
      const imgRef = storage().ref(
        `${owner.info.firstName}/images/${filename}`,
      );
      await imgRef.putFile(imgPath);
      const imgURL = await imgRef.getDownloadURL();
      fireBaseImgURL.push(imgURL);
      formDispatch({type: SET_UPLOAD_STATE, payload: i + 1});
    }

    try {
      await addItemMutation({
        variables: {
          name,
          tags: tags.map((tag) => tag.name),
          category,
          description,
          images: fireBaseImgURL,
        },
      });

      formDispatch({type: SET_SUBMIT_LOADING, payload: false});
      formDispatch({type: SET_UPLOAD_STATE, payload: 0});
      formDispatch({type: CLEAR_FORM});
      // dispatch({
      //   type: ADD_ITEM,
      //   payload: {
      //     name,
      //     owner,
      //     images: fireBaseImgURL,
      //     tags: tags.map((tag) => tag.name),
      //     category,
      //     description,
      //   },
      // });
    } catch (error) {}

    // navigate('Tab');
  }
};
