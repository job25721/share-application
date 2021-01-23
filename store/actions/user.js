import AsyncStorage from '@react-native-async-storage/async-storage';
import {SET_REFRESH_FEED} from '../types/item';

export const userLogout = (navigate) => async (dispatch) => {
  await AsyncStorage.removeItem('userToken');
  dispatch({type: 'USER_LOGOUT'});
  dispatch({type: SET_REFRESH_FEED, payload: true});
  navigate('Tab');
};
