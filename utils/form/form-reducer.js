import {
  ADD_IMAGE,
  ADD_TAG,
  REMOVE_TAG,
  SET_DESCRIPTION,
  SET_ITEM_NAME,
  SET_PICKER_TYPE,
} from './form-action-type';

export const initialState = {
  images: [],
  itemName: '',
  selectedType: null,
  description: '',
  tags: [],
};

export function formReducer(state, action) {
  switch (action.type) {
    case ADD_IMAGE:
      return {
        ...state,
        images: [...state.images, action.payload],
      };
    case SET_ITEM_NAME:
      return {
        ...state,
        itemName: action.payload,
      };
    case SET_PICKER_TYPE:
      return {
        ...state,
        selectedType: action.type,
      };
    case SET_DESCRIPTION:
      return {
        ...state,
        description: action.type,
      };
    case ADD_TAG:
      return {
        ...state,
        tags: [...state.tags, action.payload],
      };
    case REMOVE_TAG:
      return {
        ...state,
        tags: state.tags.filter((tag) => tag.id !== action.payload),
      };
    default:
      throw new Error();
  }
}
