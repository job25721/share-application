import {
  CLEAR_REQUEST_DATA,
  SET_REASON,
  SET_REQUEST_ITEM_ID,
  SET_WANTED_RATE,
} from '../types/request';

const initialState = {
  reason: '',
  wantedRate: 1,
  requestItemId: '',
};

export default function requestReducer(state = initialState, action) {
  switch (action.type) {
    case SET_REASON:
      return {
        ...state,
        reason: action.payload,
      };
    case SET_WANTED_RATE:
      return {
        ...state,
        wantedRate: action.payload,
      };
    case SET_REQUEST_ITEM_ID:
      return {
        ...state,
        requestItemId: action.payload,
      };
    case CLEAR_REQUEST_DATA:
      return initialState;
    default:
      return state;
  }
}
