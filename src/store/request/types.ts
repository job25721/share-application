import {Chat} from '../chat/types';
import {Item} from '../item/types';
import {User} from '../user/types';

const SET_REASON = 'SET_REASON';
const SET_WANTED_RATE = 'SET_WANTED_RATE';
const SET_REQUEST_ITEM_ID = 'SET_REQUEST_ITEM_ID';
const CLEAR_REQUEST_DATA = 'CLEAR_REQUEST_DATA';
export interface OnRequestLoading {
  loading: boolean;
  err: boolean;
  msg: string;
}
export type RequestActionTypes =
  | {type: typeof SET_REASON; payload: string}
  | {type: typeof SET_WANTED_RATE; payload: number}
  | {type: typeof SET_REQUEST_ITEM_ID; payload: string}
  | {type: typeof CLEAR_REQUEST_DATA}
  | {type: 'SET_REQUEST_LOADING'; payload: OnRequestLoading};

export interface RequestState {
  reason: string;
  wantedRate: number;
  requestItemId: string;
  onRequestLoading: OnRequestLoading;
}

export type RequestStatus = 'requested' | 'accepted' | 'rejected' | 'delivered';

export interface Request {
  id: string;
  itemId: string;
  requestPersonId: string;
  requestToPersonId: string;
  timestamp: string;
  reason: string;
  wantedRate: number;
  status: RequestStatus;
  chat_uid: string;
  chat: Chat;
  item: Item;
  requestPerson: User;
  requestToPerson: User;
}

export function requestStatusNormalized(status: RequestStatus): string | null {
  switch (status) {
    case 'accepted':
      return 'ได้รับการยินยอมจากเจ้าของแล้ว';
    case 'rejected':
      return 'คำขอของคุณได้รับการปฏิเสธ';
    case 'requested':
      return 'ส่งคำขอแล้ว';
    case 'delivered':
      return 'ได้ถูกส่งต่อให้คุณแล้ว';
    default:
      return null;
  }
}
