import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { Mutation } from 'react-apollo';
import { withMutation, DIR_QUERY, DIR_MUTATION } from './query';
import styles from './index.less';

function DirItem(props) {
  const { data, style } = props;
  console.log(props);
  const handleClick = () => {
    props
      .mutate({
        refetchQueries: [
          {
            query: DIR_QUERY,
          },
        ],
      })
      .then((res) => {
        console.warn(res);
      });
  };
  return (
    <Mutation mutation={DIR_MUTATION}>
      {(currentDirs) => {
        // currentDirs();
        return (
          <li key={data.id} className={styles.item} onClick={currentDirs}>
            <Icon type="folder" theme="twoTone" style={style} />
            <span className={styles.text}>{data.name}</span>
          </li>
        );
      }}
    </Mutation>
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

export default withMutation(DirItem);
