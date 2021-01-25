import React, {createContext, useCallback, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import store, {useDispatch} from './src/store';
import Auth from './src/pages/Auth';
import TabScreen from './src/pages/Index';
import {ApolloError, ApolloProvider, useQuery} from '@apollo/client';
import client from './src/graphql/client';
import {Item} from './src/store/item/types';
import Detail from './src/pages/Detail';
import Share from './src/pages/Share';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {User} from './src/store/user/types';
import Profile from './src/pages/Profile';
import 'react-native-gesture-handler';
import {GetAllItemQueryType, GET_ALL_ITEM} from './src/graphql/query/item';

const RootStack = createStackNavigator();
export type RootStackParamList = {
  Tab: undefined;
  Auth: undefined;
  Profile: {userInfo: User};
  Detail: {itemData: Item; wishlist: boolean};
  Share: undefined;
};

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <RootStackScreen />
        </ApolloProvider>
      </Provider>
    </NavigationContainer>
  );
};
type RefreshHomeContext = {
  refresh: () => Promise<void> | undefined;
  refreshing: boolean;
  itemLoading: boolean;
  error: ApolloError | undefined;
};

export const RefreshHomeContext = createContext<RefreshHomeContext>({
  refresh: () => undefined,
  refreshing: false,
  itemLoading: false,
  error: undefined,
});

const RootStackScreen: React.FC = () => {
  const dispatch = useDispatch();

  const {refetch, loading, error} = useQuery<GetAllItemQueryType>(GET_ALL_ITEM);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const refetchItem = useCallback(async () => {
    setRefreshing(true);
    try {
      const refetchItemRes = await refetch();
      if (refetchItemRes.data) {
        dispatch({
          type: 'SET_FEED_ITEMS',
          payload: refetchItemRes.data.getAllItem.filter(
            ({status}) => status === 'available',
          ),
        });
      }
      setRefreshing(false);
    } catch (err) {
      // Alert.alert(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch]);

  useEffect(() => {
    refetchItem();
  }, []);

  useEffect(() => {
    const getToken = async () => {
      console.log('in');
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          dispatch({type: 'SET_TOKEN', payload: token});
          const user = await AsyncStorage.getItem('userInfo');
          if (user) {
            dispatch({
              type: 'SET_USER_DATA',
              payload: JSON.parse(user),
            });
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    getToken();
  }, [dispatch]);
  return (
    <RefreshHomeContext.Provider
      value={{refresh: refetchItem, refreshing, itemLoading: loading, error}}>
      <RootStack.Navigator mode="card">
        <RootStack.Screen
          name="Tab"
          component={TabScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="Detail"
          component={Detail}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="Share"
          component={Share}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
      </RootStack.Navigator>
    </RefreshHomeContext.Provider>
  );
};

export default App;
