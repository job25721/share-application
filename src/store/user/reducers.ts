import {Request} from '../request/types';
import {UserActionTypes, UserState, SendingItem} from './types';

const initialState: UserState = {
  token: null,
  userData: undefined,
  myItem: [],
  mySendRequests: [],
  myReceiveRequests: [],
  mySavedItem: [],
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
    case 'SET_MY_SEND_REQUETS':
      return {
        ...state,
        mySendRequests: action.payload,
      };
    case 'ADD_MY_SEND_REQUETS':
      return {
        ...state,
        mySendRequests: [action.payload, ...state.mySendRequests],
      };
    case 'SET_MY_RECEIVE_REQUETS':
      return {
        ...state,
        myReceiveRequests: preprocessData(action.payload),
      };
    case 'ADD_MY_RECEIVE_REQUETS':
      return {
        ...state,
        myReceiveRequests: preprocessAddNewRequestAbstract(
          state.myReceiveRequests,
          action.payload,
        ),
      };
    case 'SET_MY_SAVED_ITEM':
      return {
        ...state,
        mySavedItem: action.payload,
      };
    case 'ADD_MY_SAVED_ITEM':
      return {
        ...state,
        mySavedItem: [action.payload, ...state.mySavedItem],
      };
    case 'REMOVE_SAVED_ITEM':
      return {
        ...state,
        mySavedItem: state.mySavedItem.filter(({id}) => id !== action.payload),
      };
    default:
      return state;
  }
}

function preprocessAddNewRequestAbstract(
  oldState: SendingItem[],
  newRequest: Request,
): SendingItem[] {
  const isItemExist: boolean = oldState.some(
    (s) => s.item.id === newRequest.item.id,
  );
  if (isItemExist) {
    return oldState.map<SendingItem>((s) => {
      if (s.item.id === newRequest.id) {
        return {
          ...s,
          request: [newRequest, ...s.request],
        };
      }
      return s;
    });
  }

  return [{item: newRequest.item, request: [newRequest], ...oldState}];
}

function preprocessData(myReceiveRequests: Request[]) {
  let mySendingItem: SendingItem[] = [];
  for (let i = 0; i < myReceiveRequests.length; i++) {
    const current = myReceiveRequests[i];
    const exist: boolean = mySendingItem.some(
      (s) => s.item.id === current.item.id,
    );
    if (!exist) {
      const pushData: SendingItem = {item: current.item, request: [current]};
      mySendingItem.push(pushData);
    } else {
      const newState: SendingItem[] = mySendingItem.map<SendingItem>((s) => {
        if (s.item.id === current.item.id) {
          return {item: s.item, request: [...s.request, current]};
        }

        return s;
      });
      mySendingItem = newState;
    }
  }

  return mySendingItem;
}
