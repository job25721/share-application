import {Item} from '../item/types';

export const SET_TOKEN = 'SET_TOKEN';
export const SET_USER_DATA = 'SET_USER_DATA';

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

export interface UserState {
  token: string | null;
  userData: User | undefined;
  myItem: Item[];
}

export interface SetTokenAction {
  type: typeof SET_TOKEN;
  payload: string | null;
}

export interface SetUserDataAction {
  type: typeof SET_USER_DATA;
  payload: User;
}

export type UserActionTypes = SetTokenAction | SetUserDataAction;
