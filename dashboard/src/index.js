import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import App from './App';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
});

// 获取装载组件的根节点
const mountNode = document.getElementById('root');

// 定义根组件渲染的函数
const rootRender = (Component) =>
  render(
    <ApolloProvider client={client}>
      <Component />
    </ApolloProvider>,
    mountNode
  );

rootRender(App);

// FIXME: react-hot-loader@latest不需要这个判断了
// if (module.hot) {
//   module.hot.accept('./routes', () => {
//     rootRender(App)
//   })
// }
