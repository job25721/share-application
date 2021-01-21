import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  concat,
  ApolloLink,
} from '@apollo/client';
// import {setContext} from '@apollo/client/link/context';

import AsyncStorage from '@react-native-async-storage/async-storage';
const httpLink = new HttpLink({uri: 'http://localhost:4001/graphql'});

const authMiddleware = new ApolloLink(async (operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization:
        `Bearer ${await AsyncStorage.getItem('userToken')}` || null,
    },
  });
  return forward(operation);
});

export const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});
