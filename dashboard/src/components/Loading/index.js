import React from 'react';
import { Spin, Icon } from 'antd';
import { branch, renderComponent } from 'recompose';

export default function Loading() {
  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

  return <Spin indicator={antIcon} />;
}

export const displayLoadingState = branch((props) => {
  // console.log(props.loading);
  return props.loading;
}, renderComponent(Loading));
