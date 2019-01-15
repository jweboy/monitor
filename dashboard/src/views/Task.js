import React, { Component } from 'react';
import { Layout } from 'antd';
import { hot } from 'react-hot-loader';
// import PropTypes from 'prop-types';
import { LeftMenu, Terminal } from '../components';

class TaskPage extends Component {
  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <LeftMenu />
        <Terminal />
      </Layout>
    );
  }
}

export default hot(module)(TaskPage);
