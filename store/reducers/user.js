import {SET_TOKEN, SET_USER_DATA} from '../actions/user';

const initialState = {
  token: null,
  userData: null,
  MyItem: [],
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SET_USER_DATA: {
      return {
        ...state,
        userData: action.payload,
      };
    }
    default:
      return state;
  }
}
