import {
  ADD_IMAGE,
  REMOVE_IMAGE,
  ADD_TAG,
  REMOVE_TAG,
  SET_DESCRIPTION,
  SET_ITEM_NAME,
  SET_PICKER_TYPE,
  SET_MODAL,
  CLEAR_FORM,
  SET_IMAGE_PREVIEW,
} from './form-action-type';

export const initialState = {
  images: [
    // require('../../assets/img/cat.jpg'),
    // require('../../assets/img/bag.jpg'),
  ],
  itemName: '',
  selectedType: null,
  description: '',
  tags: [],
  pickerModalOpen: false,
  imagePreviewOpen: false,
  pickerItems: [
    {label: 'สวัสดีค้าบบ', value: 'สวัสดีค้าบบ', key: 1},
    {label: 'ท่านสมาชิก', value: 'ท่านสมาชิก', key: 2},
  ],
};

export function formReducer(state, action) {
  switch (action.type) {
    case ADD_IMAGE:
      return {
        ...state,
        images: [...state.images, ...action.payload],
      };
    case SET_ITEM_NAME:
      return {
        ...state,
        itemName: action.payload,
      };
    case SET_PICKER_TYPE:
      return {
        ...state,
        selectedType: action.payload,
      };
    case SET_DESCRIPTION:
      return {
        ...state,
        description: action.payload,
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
    case REMOVE_IMAGE:
      return {
        ...state,
        images: state.images.filter((uri) => uri !== action.payload),
      };
    case SET_MODAL:
      return {
        ...state,
        pickerModalOpen: action.payload,
      };
    case SET_IMAGE_PREVIEW:
      return {
        ...state,
        imagePreviewOpen: action.payload,
      };
    case CLEAR_FORM:
      return initialState;
    default:
      throw new Error();
  }
}
