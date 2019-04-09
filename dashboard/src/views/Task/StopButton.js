import React, { Component } from 'react';
import { Button, message } from 'antd';
import { withMutation } from './query';

@withMutation
class StopButton extends Component {
  handleClick = () => {
    const { mutate, killed } = this.props;
    if (!killed) {
      return mutate().then(() => {
        message.success('进程暂停成功');
      });
    }

    message.error('当前进程暂未启动');
  };
  render() {
    return (
      <Button type="danger" onClick={this.handleClick}>
        停止
      </Button>
    );
  }
}

export default StopButton;
