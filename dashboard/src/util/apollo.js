import { HttpLink } from 'apollo-link-http';
import { getMainDefinition } from 'apollo-utilities';
import { WebSocketLink } from 'apollo-link-ws';
import { ApolloLink, split } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloClient } from 'apollo-client';
// import { SubscriptionClient } from 'subscriptions-transport-ws';
import { notification } from 'antd';

const WEBSOCKET_ENDPOINT = 'ws://localhost:4000/graphql';
const GRAPHQL_ENDPOINT = 'http://localhost:4000/graphql';

// 只有一个export，增加这个注释，多个export删除
/* eslint-disable */ 
export function createApolloClient() {
  // Apollo error handler
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, path }) => {
        notification.error({
          message: `[GraphQL error]: Message: ${message}, Path: ${path}`,
        });
      });
    }

    if (networkError) {
      notification.error({
        message: `[Network error]: ${networkError}`,
      });
    }
  });

  const httpLink = new HttpLink({ uri: GRAPHQL_ENDPOINT });
  
  // Websocket
  // const wsClient = new SubscriptionClient(WEBSOCKET_ENDPOINT, {
  //   reconnect: true,
  // });
    
  // Subscription websocket client
  const wsLink = new WebSocketLink({
    uri: WEBSOCKET_ENDPOINT,
    options: {
      reconnect: true,
    },
  });

  // 区分 subscription 操作类型和 Query、Mutation 操作类型
  const terminatingLink = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink
  );

  const link = ApolloLink.from([errorLink, terminatingLink]);
  
  // Apollo cache
  const cache = new InMemoryCache();

  // graphql client
  const apolloClient = new ApolloClient({
    link,
    cache,
  });

  return { apolloClient };
}
