import {ChatActionTypes, ChatState} from './types';

const initialState: ChatState = {
  tabIndex: 0,
  messages: [
    {
      pos: 'right',
      msg: ['ผมจะบริจาคให้ 1000 บาท'],
      time: Date.now().toString(),
    },
    {
      pos: 'right',
      msg: ['ประมาณ วันพรุ่งนี้ ตอนเที่ยง'],
      time: Date.now().toString(),
    },
    {
      pos: 'left',
      msg: ['คุณพี่จะเอาชื่อขึ้นหน้าจอไหมค้า'],
      time: Date.now().toString(),
    },
    {
      pos: 'right',
      msg: ['ไม่ต้องครับ ไม่จำเป็น...'],
      time: Date.now().toString(),
    },
    {
      pos: 'left',
      msg: ['ขอบพระคุณค่ะ ขอให้คุณพี่มีแต่ความสุขความเจริญ'],
      time: Date.now().toString(),
    },
    {
      pos: 'right',
      msg: ['แต่...', 'แต่ว่า'],
      time: Date.now().toString(),
    },
    {
      pos: 'right',
      msg: ['ผมจะให้คุณ...'],
      time: Date.now().toString(),
    },
  ],
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
    default:
      return state;
  }
}
