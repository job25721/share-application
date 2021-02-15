import {User} from '../user/types';

const ADD_ITEM = 'ADD_ITEM';
const SET_FEED_ITEMS = 'SET_FEED_ITEMS';
const ADD_MY_RECEIVING_ITEM = 'ADD_MY_RECEIVING_ITEM';
const SET_MY_RECEIVING_ITEM = 'SET_MY_RECEIVING_ITEM';

interface AddItemAction {
  type: typeof ADD_ITEM;
  payload: Item;
}
interface SetFeedItemsAction {
  type: typeof SET_FEED_ITEMS;
  payload: Item[];
}

interface SetMyReceivingItem {
  type: typeof SET_MY_RECEIVING_ITEM;
  payload: Item[];
}

interface AddMyReceivingItem {
  type: typeof ADD_MY_RECEIVING_ITEM;
  payload: Item;
}

export type ItemActionTypes =
  | AddItemAction
  | SetFeedItemsAction
  | SetMyReceivingItem
  | AddMyReceivingItem
  | {type: 'SET_REFRESH_FEED'; payload: boolean}
  | {type: 'SET_SEARCH_RESULT'; payload: Item[]}
  | {type: 'SET_SEARCH_SUBMIT'; payload: string};

export interface Item {
  id: string;
  name: string;
  description: string;
  category: string | undefined;
  tags: string[];
  ownerId: string;
  images: string[];
  status: string;
  createdDate: string;
  logId: string;
  owner: User;
  log: ItemLog;
  acceptedToPerson: User | null;
}

interface ItemLog {
  id: string;
  itemId: string;
  logs: LogData[];
}

interface LogData {
  timestamp: Date;
  actor: string;
  action: string;
  hash: string;
  prevHash: string;
}

export interface ItemState {
  feedItems: Item[];
  myReceivingItem: Item[];
  refreshFeed: boolean;
  searchResult: Item[];
  submitSearchKey: string;
}
