import {ChatActionTypes, ChatState} from './types';

const initialState: ChatState = {
  tabIndex: 0,
};

export function chatReducer(
  state: ChatState = initialState,
  action: ChatActionTypes,
): ChatState {
  switch (action.type) {
    case 'SET_TAB_INDEX':
      return {
        ...state,
        tabIndex: action.payload,
      };
    default:
      return state;
  }
}
