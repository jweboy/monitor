import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { Button } from 'antd';
import { DIR_QUERY } from './query';
import styles from './index.less';

export default function BackButton(props) {
  const { currentPath } = props;
  console.log(currentPath);
  const handleClick = (client) => () => {
    client.query({
      query: DIR_QUERY,
      variables: { path: currentPath, type: 'back' },
    });
  };

  return (
    <ApolloConsumer>
      {(client) => (
        <Button
          shape="circle"
          icon="up"
          type="primary"
          onClick={handleClick(client)}
          size="small"
          className={styles.btn}
        />
      )}
    </ApolloConsumer>
  );
}
