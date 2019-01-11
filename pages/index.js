import { Component } from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import Head from 'next/head'
// import Xterm from 'xterm';
import LeftMenu from './components/LeftMenu';

const Container = styled.div`
  height: 100vh;
`;

/* eslint-disable */
export default class App extends Component {
  componentDidMount = () => {
    const termContainer = document.getElementById('terminal');
    const term = new Terminal();
    term.open(termContainer);
    term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');
  }

  render() {
    return (
      <Container>
        <Head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/xterm/3.10.1/xterm.min.css" />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/xterm/3.10.1/xterm.min.js"></script>
        </Head>
        <Layout style={{ height: '100%' }}>
          <LeftMenu />
          <div id="terminal"></div>
        </Layout>
      </Container>
    );
  }
}
