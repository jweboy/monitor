import React, { Component } from 'react';
import { Button, message } from 'antd';
import { withMutation } from './query';

@withMutation
class StopButton extends Component {
  handleClick = () => {
    const { mutate, killed, dispatch } = this.props;

    if (killed) {
      return message.error('当前进程暂未启动');
    }

    mutate().then(() => {
      dispatch(true);
      message.success('进程暂停成功');
    });
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
