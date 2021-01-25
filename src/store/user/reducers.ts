import {UserActionTypes, UserState} from './types';

const initialState: UserState = {
  token: null,
  userData: undefined,
  myItem: [],
};

export default function userReducers(
  state: UserState = initialState,
  action: UserActionTypes,
): UserState {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    case 'SET_USER_DATA':
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
}
