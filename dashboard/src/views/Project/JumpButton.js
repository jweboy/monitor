import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import styles from './index.less';

function JumpButton(props) {
  const { onClick, text } = props;
  console.log(props);
  return (
    <Button type="primary" className={styles.btn} onClick={onClick} style={{ marginRight: 30 }}>
      {text}
    </Button>
  );
}

JumpButton.defaultProps = {
  onClick: () => {},
  text: '',
};

JumpButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
};

export default JumpButton;
