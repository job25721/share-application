import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  concat,
  ApolloLink,
} from '@apollo/client';
// import {setContext} from '@apollo/client/link/context';

import AsyncStorage from '@react-native-async-storage/async-storage';
const httpLink = new HttpLink({uri: 'http://18.216.73.101/graphql'});

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

const cache = new InMemoryCache({
  typePolicies: {
    Agenda: {
      fields: {
        tasks: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

export const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache,
  onError: ({networkError, graphQLErrors}) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  },
});
