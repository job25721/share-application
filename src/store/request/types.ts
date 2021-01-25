import {Item} from '../item/types';
import {User} from '../user/types';

export const SET_REASON = 'SET_REASON';
export const SET_WANTED_RATE = 'SET_WANTED_RATE';
export const SET_REQUEST_ITEM_ID = 'SET_REQUEST_ITEM_ID';
export const CLEAR_REQUEST_DATA = 'CLEAR_REQUEST_DATA';

export type RequestActionTypes =
  | {type: typeof SET_REASON; payload: string}
  | {type: typeof SET_WANTED_RATE; payload: number}
  | {type: typeof SET_REQUEST_ITEM_ID; payload: string}
  | {type: typeof CLEAR_REQUEST_DATA};

export interface RequestState {
  reason: string;
  wantedRate: number;
  requestItemId: string;
}

export interface Request {
  id: string;
  itemId: string;
  requestPersonId: string;
  requestToPersonId: string;
  timestamp: string;
  reason: string;
  wantedRate: number;
  status: string;
  chat_uid: string;
  item?: Item[];
  requestPerson?: User;
  requestToPerson?: User;
}
