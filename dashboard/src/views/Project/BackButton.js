import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { withMutation, mutateDirOption } from './query';
import styles from './index.less';

function BackButton(props) {
  const handleClick = () => {
    props.mutate(
      mutateDirOption({
        variables: {
          type: 'back',
          path: props.currentPath,
        },
      })
    );
  };

  return <Button shape="circle" icon="up" type="primary" onClick={handleClick} size="small" className={styles.btn} />;
}

BackButton.defaultProps = {
  mutate: () => {},
  currentPath: '',
};

BackButton.propTypes = {
  mutate: PropTypes.func,
  currentPath: PropTypes.string,
};

export default withMutation(BackButton);
