import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { ApolloConsumer } from 'react-apollo';
import { DIR_QUERY } from './query';
import styles from './index.less';

function DirItem(props) {
  const { data, style } = props;
  // console.warn(data.currentPath);
  const handleClick = (client) => () => {
    // client.query({
    //   query: DIR_QUERY,
    //   variables: { type: 'forward', path: data.currentPath, fileName: data.name },
    // });
  };
  return (
    <ApolloConsumer>
      {(client) => {
        // currentDirs();
        return (
          <li key={data.id} className={styles.item} onClick={handleClick(client)}>
            <Icon type="folder" theme="twoTone" style={style} />
            <span className={styles.text}>{data.name}</span>
          </li>
        );
      }}
    </ApolloConsumer>
  );
}

DirItem.defaultProps = {
  data: {},
  style: {},
};

DirItem.propTypes = {
  data: PropTypes.object,
  style: PropTypes.object,
};

export default DirItem;
