import React from 'react';
import { Spin, Icon } from 'antd';

export default function Loading() {
  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

  return <Spin indicator={antIcon} />;
}
