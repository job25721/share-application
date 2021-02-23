import {NewDirectMessage} from '../../graphql/subcription/chat';
import {Request} from '../request/types';
import {User} from '../user/types';

export interface ChatMessageSchema {
  from: string;
  to: string;
  message: string;
  timestamp: Date;
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

export interface SendMessage {
  chatRoomId: string;
  messagePayload: ChatMessageSchema;
}

export interface ChatState {
  tabIndex: ChatTabIndexType;
  messages: ChatMessageDisplay[];
  chatWith: User | null;
  currentProcessRequest: Request;
  loadingAction: boolean;
  newDirectMessage?: NewDirectMessage;
}

export type ChatActionTypes =
  | {
      type: 'SET_TAB_INDEX';
      payload: ChatTabIndexType;
    }
  | {type: 'SET_MESSAGE'; payload: ChatMessageDisplay[]}
  | {type: 'ADD_MESSAGE'; payload: ChatMessageDisplay}
  | {type: 'SET_CHAT_WITH'; payload: User | null}
  | {type: 'SET_CURRENT_PROCESS_REQUEST'; payload: Request | null}
  | {type: 'SET_LOADING_ACTION'; payload: boolean}
  | {type: 'SET_NEW_DIRECT'; payload: NewDirectMessage};
