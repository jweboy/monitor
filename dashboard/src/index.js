import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, compose } from 'react-apollo';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './views/Router';
import reducers from './reducers';

const REQUEST_URL = 'http://localhost:3000/graphql';

// graphql client
const client = new ApolloClient({
  uri: REQUEST_URL,
});

const initialState = {};

const store = createStore(
  reducers,
  initialState,
  compose(typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f)
);

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
