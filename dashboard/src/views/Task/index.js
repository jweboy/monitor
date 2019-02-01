import React, { Component } from 'react';
import { Layout } from 'antd';
import { hot } from 'react-hot-loader';
// import PropTypes from 'prop-types';
import { LeftMenu, Terminal } from '../../components';
import Consumer from '../../components/Consumer';

class TaskPage extends Component {
  static defaultProps = {
    scripts: [],
  };
  constructor(props) {
    super(props);

    const scripts = props.scripts.map((item) => {
      return { type: item, text: item };
    });

    this.state = {
      menu: [
        {
          type: 'task',
          text: '任务',
          children: scripts,
        },
      ],
    };
    this.socket = props.socket;
  }
  render() {
    const { menu } = this.state;
    return (
      <Layout style={{ height: '100%' }}>
        <LeftMenu data={menu} />
        {/* <Terminal /> */}
      </Layout>
    );
  }
}

export default hot(module)(Consumer(TaskPage));
