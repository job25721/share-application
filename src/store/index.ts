import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {combineReducers} from 'redux';
import {useDispatch as _useDispatch} from 'react-redux';
import itemReducers from './item/reducers';
import userReducers from './user/reducers';
import requestReducers from './request/reducers';

import {RequestActionTypes} from './request/types';
import {ItemActionTypes} from './item/types';
import {UserActionTypes} from './user/types';

const appReducer = combineReducers({
  item: itemReducers,
  user: userReducers,
  request: requestReducers,
});

export type RootState = ReturnType<typeof appReducer>;
type StoreEvent =
  | RequestActionTypes
  | ItemActionTypes
  | UserActionTypes
  | {type: 'USER_LOGOUT'};

export function useDispatch() {
  const dispatch = _useDispatch();
  return (event: StoreEvent) => {
    dispatch(event);
  };
}

const rootReducer = (state: RootState | undefined, action: any) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default createStore(rootReducer, applyMiddleware(thunk));
