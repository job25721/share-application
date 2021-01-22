import {Alert} from 'react-native';
import {
  CLEAR_FORM,
  SET_SUBMIT_LOADING,
  SET_UPLOAD_STATE,
} from '../../utils/form/form-action-type';
import {ADD_ITEM} from '../types/item';
import storage from '@react-native-firebase/storage';

export const addItemAction = (
  itemData,
  formContextDispatch,
  navigate,
  addItemMutation,
) => async (dispatch) => {
  const {name, category, description, tags, images, owner} = itemData;
  if (
    // images.length > 0 &&
    name !== '' &&
    category !== null &&
    description !== ''
  ) {
    formContextDispatch({type: SET_SUBMIT_LOADING, payload: true});
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
      formContextDispatch({type: SET_UPLOAD_STATE, payload: i + 1});
    }
    try {
      const {data} = await addItemMutation({
        variables: {
          name,
          tags: tags.map((tag) => tag.name),
          category,
          description,
          images: fireBaseImgURL,
        },
      });
      if (data) {
        dispatch({
          type: ADD_ITEM,
          payload: {
            id: data.addNewItem.id,
            name,
            owner,
            images,
            tags: tags.map((tag) => tag.name),
            category,
            description,
          },
        });
      }
      formContextDispatch({type: SET_SUBMIT_LOADING, payload: false});
      formContextDispatch({type: SET_UPLOAD_STATE, payload: 0});
      formContextDispatch({type: CLEAR_FORM});
      navigate('Tab');
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
