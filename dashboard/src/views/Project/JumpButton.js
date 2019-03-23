import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import { Button } from 'antd';
import styles from './index.less';

function JumpButton(props) {
  function handleOnClick() {
    const state = {
      currentPath: props.currentPath,
    };
    navigate('/task', { state });
  }
  return (
    <Button type="primary" className={styles.jumpBtn} onClick={handleOnClick}>
      start
    </Button>
  );
}

JumpButton.defaultProps = {
  currentPath: '',
};

JumpButton.propTypes = {
  currentPath: PropTypes.string,
};

export default JumpButton;
