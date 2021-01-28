import {getTime} from '../../utils/getTime';
import {ChatActionTypes, ChatState} from './types';

const initialState: ChatState = {
  tabIndex: 0,
  messages: [
    {
      pos: 'right',
      msg: ['ผมจะบริจาคให้ 1000 บาท'],
      time: getTime(Date.now()),
    },
    {
      pos: 'right',
      msg: ['ประมาณ วันพรุ่งนี้ ตอนเที่ยง'],
      time: getTime(Date.now()),
    },
    {
      pos: 'left',
      msg: ['คุณพี่จะเอาชื่อขึ้นหน้าจอไหมค้า'],
      time: getTime(Date.now()),
    },
    {
      pos: 'right',
      msg: ['ไม่ต้องครับ ไม่จำเป็น...'],
      time: getTime(Date.now()),
    },
    {
      pos: 'left',
      msg: ['ขอบพระคุณค่ะ ขอให้คุณพี่มีแต่ความสุขความเจริญ'],
      time: getTime(Date.now()),
    },
    {
      pos: 'right',
      msg: ['แต่...', 'แต่ว่า'],
      time: getTime(Date.now()),
    },
    {
      pos: 'right',
      msg: ['ผมจะให้คุณ...'],
      time: getTime(Date.now()),
    },
  ],
  chatWith: null,
  currentProcessRequest: null,
  loadingAction: false,
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
    default:
      return state;
  }
}
