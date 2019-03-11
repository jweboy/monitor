import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { LeftMenu, Terminal } from '../../components';
import { withQuery, mapDispatchToProps } from './query';

@connect(
  () => ({}),
  mapDispatchToProps
)
@withQuery
class TaskPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  static getDerivedStateFromProps(props, state) {
    if (props.scripts !== state.scripts && props.scripts.length > 0) {
      const taskMenu = {
        type: 'task',
        name: '任务',
        children: props.scripts,
      };
      props.dispatchMenuChild(props.scripts);
      props.dispatchMenu(taskMenu);
    }
    return null;
  }
  render() {
    return (
      <div>
        TaskPage
        {/* <Terminal /> */}
      </div>
    );
  }
}

export default TaskPage;
