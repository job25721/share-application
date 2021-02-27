import {ChatActionTypes, ChatState} from './types';

const initialState: ChatState = {
  tabIndex: 0,
  messages: [],
  chatWith: null,
  currentProcessRequest: null,
  loadingAction: false,
  newDirectMessage: undefined,
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
    case 'SET_MESSAGE':
      return {
        ...state,
        messages: action.payload,
      };
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case 'SET_CHAT_WITH':
      return {
        ...state,
        chatWith: action.payload,
      };
    case 'SET_CURRENT_PROCESS_REQUEST':
      return {
        ...state,
        currentProcessRequest: action.payload,
      };
    case 'SET_LOADING_ACTION':
      return {
        ...state,
        loadingAction: action.payload,
      };
    case 'SET_NEW_DIRECT':
      return {
        ...state,
        newDirectMessage: action.payload,
      };
    default:
      return state;
  }
}
