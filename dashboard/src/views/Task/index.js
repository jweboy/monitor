import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LeftMenu, Terminal } from '../../components';
import { withQuery } from './query';

@withQuery
class TaskPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // menu: [
      //   {
      //     type: 'task',
      //     name: '任务',
      //     children: props.scripts,
      //   },
      // ],
      scripts: [],
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.scripts !== state.scripts && props.scripts.length > 0) {
      return {
        scripts: props.scripts,
      };
    }
    return null;
  }
  componentDidMount() {
    // dispatch menu action
  }
  render() {
    const { scripts } = this.state;
    console.table(scripts);
    // const { scripts } = this.props;
    return (
      <div>
        TaskPage
        {/* <LeftMenu data={menu} /> */}
        {/* <Terminal /> */}
      </div>
    );
  }
}

// TaskPage.defaultProps = {
//   scripts: [],
// };

// TaskPage.propTypes = {
//   scripts: PropTypes.array,
// };

export default TaskPage;
