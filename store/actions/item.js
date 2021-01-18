import {ADD_ITEM} from '../types/item';

export const addNewItem = ({
  name,
  owner,
  images,
  tags,
  category,
  description,
}) => (dispatch) => {
  dispatch({
    type: ADD_ITEM,
    payload: {name, owner, images, tags, category, description},
  });
};
