import {Item} from '../item/types';
import {Request} from '../request/types';

const SET_TOKEN = 'SET_TOKEN';
const SET_USER_DATA = 'SET_USER_DATA';
const SET_MY_SEND_REQUETS = 'SET_MY_SEND_REQUETS';
const ADD_MY_SEND_REQUETS = 'ADD_MY_SEND_REQUETS';
const SET_MY_RECEIVE_REQUETS = 'SET_MY_RECEIVE_REQUETS';
const ADD_MY_RECEIVE_REQUETS = 'ADD_MY_RECEIVE_REQUETS';

export interface UserState {
  token: string | null;
  userData: User | undefined;
  myItem: Item[];
  mySendRequests: Request[];
  myReceiveRequests: SendingItem[];
  mySavedItem: Item[];
}

export interface SendingItem {
  item: Item;
  request: Request[];
}

export interface User {
  id: string;
  username: string;
  password?: string;
  email?: string;
  avatar: string;
  info: UserInfo;
}
export interface UserInfo {
  firstName: string;
  lastName: string;
  birthDate?: string;
  age?: number;
}

export interface SetTokenAction {
  type: typeof SET_TOKEN;
  payload: string | null;
}

export interface SetUserDataAction {
  type: typeof SET_USER_DATA;
  payload: User;
}

export interface SetMySendRequestsAction {
  type: typeof SET_MY_SEND_REQUETS;
  payload: Request[];
}

export interface AddMyReceiveRequestsAction {
  type: typeof ADD_MY_SEND_REQUETS;
  payload: Request;
}

export interface SetMyReceiveRequestsAction {
  type: typeof SET_MY_RECEIVE_REQUETS;
  payload: Request[];
}

export interface AddMySendRequestsAction {
  type: typeof ADD_MY_RECEIVE_REQUETS;
  payload: Request;
}

export type UserActionTypes =
  | SetTokenAction
  | SetUserDataAction
  | SetMySendRequestsAction
  | AddMySendRequestsAction
  | SetMyReceiveRequestsAction
  | AddMyReceiveRequestsAction
  | {type: 'SET_MY_SAVED_ITEM'; payload: Item[]}
  | {type: 'ADD_MY_SAVED_ITEM'; payload: Item}
  | {type: 'REMOVE_SAVED_ITEM'; payload: string};
