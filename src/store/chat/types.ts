interface ChatMessageSchema {
  from: string;
  to: string;
  message: string;
  timestamp: string;
}
export interface Chat {
  id: string;
  data: ChatMessageSchema[];
  active: boolean;
  lastestUpdate: number;
}

type ChatTabIndexType = 0 | 1;

type ChatPositionType = 'left' | 'right';

export interface ChatMessageDisplay {
  pos: ChatPositionType;
  msg: string[];
  time: string;
}

export interface ChatState {
  tabIndex: ChatTabIndexType;
  messages: ChatMessageDisplay[];
}

export type ChatActionTypes =
  | {
      type: 'SET_TAB_INDEX';
      payload: ChatTabIndexType;
    }
  | {type: 'SET_MESSAGE'; payload: ChatMessageDisplay[]}
  | {type: 'ADD_MESSAGE'; payload: ChatMessageDisplay};
