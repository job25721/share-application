interface ChatMessage {
  from: string;
  to: string;
  message: string;
  timestamp: string;
}
export interface Chat {
  id: string;
  data: ChatMessage[];
  active: boolean;
  lastestUpdate: number;
}

type ChatTabIndexType = 0 | 1;
export interface ChatState {
  tabIndex: ChatTabIndexType;
}

export type ChatActionTypes = {
  type: 'SET_TAB_INDEX';
  payload: ChatTabIndexType;
};
