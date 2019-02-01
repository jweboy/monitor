import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { pure, compose } from 'recompose';
import { displayLoadingState } from '../../components/Loading';
import { withMutation, mutateDirOption } from './query';
import styles from './index.less';

function DirItem(props) {
  const iconStyle = { fontSize: 24 };
  const { data } = props;

  const handleClick = () => {
    props.mutate(
      mutateDirOption({
        variables: {
          type: 'forward',
          path: data.currentPath,
          fileName: data.name,
        },
      })
    );
  };

  return (
    <li key={data.id} className={styles.item} onClick={handleClick}>
      <Icon type="folder" theme="twoTone" style={iconStyle} />
      <span className={styles.text}>{data.name}</span>
    </li>
  );
}

DirItem.defaultProps = {
  data: {
    name: '',
    currentPath: '',
  },
  mutate: () => {},
};

DirItem.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    currentPath: PropTypes.string,
  }),
  mutate: PropTypes.func,
};

// export default compose(
//   withMutation,
//   displayLoadingState,
//   pure
// )(DirItem);
export default withMutation(DirItem);
