import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { Button } from 'antd';
import styles from './index.less';
import { Terminal } from '../../components';
import { withQuery, mapDispatchToProps } from './query';

@connect(
  () => ({}),
  mapDispatchToProps
)
@withQuery
class TaskPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scripts: [],
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.scripts !== state.scripts) {
      const taskMenu = { type: 'task', name: '任务', children: props.scripts };
      props.scriptList(props.scripts);
      props.leftbar(taskMenu);

      return { scripts: props.scripts };
    }
    return null;
  }
  render() {
    // console.warn(this.props)
    return (
      <div>
        <div className={styles.header}>
          <Button type="danger">停止</Button>
        </div>
        <Terminal />
      </div>
    );
  }
}

TaskPage.defaultProps = {
  scripts: [],
};

// TaskPage.propTypes = {
//   scripts: PropTypes.arrayOf(
//     PropTypes.shape({
//       name: PropTypes.string,
//       value: PropTypes.string,
//       id: PropTypes.string,
//     })
//   ),
// };

export default TaskPage;
