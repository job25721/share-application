import {combineReducers} from 'redux';
import chatReducer from './chat';
import itemReducer from './item';
import requestReducer from './request';
import userReducer from './user';

const appReducer = combineReducers({
  item: itemReducer,
  user: userReducer,
  request: requestReducer,
  chat: chatReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
