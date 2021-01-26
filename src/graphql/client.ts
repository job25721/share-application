import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  split,
  ApolloLink,
  concat,
} from '@apollo/client';

import {WebSocketLink} from '@apollo/client/link/ws';

import {getMainDefinition} from '@apollo/client/utilities';
import AsyncStorage from '@react-native-async-storage/async-storage';

const httpLink = new HttpLink({
  uri: 'http://localhost:4001/graphql',
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4001/graphql',
  options: {
    reconnect: true,
  },
});
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

const networkLink = split(
  ({query}) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const cache = new InMemoryCache();

const client = new ApolloClient<NormalizedCacheObject>({
  link: concat(authMiddleware, networkLink),
  cache,
});

export default client;
