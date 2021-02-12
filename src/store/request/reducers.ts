import {RequestActionTypes, RequestState} from './types';

const initialState: RequestState = {
  reason: '',
  wantedRate: 1,
  requestItemId: '',
  onRequestLoading: {
    msg: '',
    loading: false,
    err: false,
  },
};

export default function requestReducers(
  state: RequestState = initialState,
  action: RequestActionTypes,
): RequestState {
  switch (action.type) {
    case 'SET_REASON':
      return {
        ...state,
        reason: action.payload,
      };
    case 'SET_WANTED_RATE':
      return {
        ...state,
        wantedRate: action.payload,
      };
    case 'SET_REQUEST_ITEM_ID':
      return {
        ...state,
        requestItemId: action.payload,
      };
    case 'SET_REQUEST_LOADING':
      return {
        ...state,
        onRequestLoading: action.payload,
      };
    case 'CLEAR_REQUEST_DATA':
      return initialState;
    default:
      return state;
  }
}
