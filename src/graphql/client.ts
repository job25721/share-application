import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  split,
  ApolloLink,
  concat,
  ApolloCache,
  NormalizedCacheObject,
} from '@apollo/client';

import {WebSocketLink} from '@apollo/client/link/ws';

import {getMainDefinition} from '@apollo/client/utilities';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL_ONLINE, API_LOCAL, API_DEV} from '../config';

const apiLink = {
  local: API_LOCAL,
  online: API_URL_ONLINE,
  dev: API_DEV,
};

const httpLink = new HttpLink({
  uri: `http://${apiLink.online}/graphql`,
});

const wsLink = new WebSocketLink({
  uri: `ws://${apiLink.online}/graphql`,
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

const cache: ApolloCache<NormalizedCacheObject> = new InMemoryCache();

const client = new ApolloClient({
  link: concat(authMiddleware, networkLink),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
    },
  },
});

export default client;
