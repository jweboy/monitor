import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
    this.state = {
      // menu: [
      //   {
      //     type: 'task',
      //     name: '任务',
      //     children: props.scripts,
      //   },
      // ],
      // scripts: props.menu,
    };
  }
  // static getDerivedStateFromProps(props, state) {
  //   if (props.scripts !== state.scripts && props.scripts.length > 0) {
  //     return {
  //       scripts: props.menu,
  //     };
  //   }
  //   return null;
  // }
  componentDidMount() {
    const { action } = this.props;
    //   // console.error(this.state.scripts);
    action(33);
  }
  render() {
    // const { scripts } = this.state;
    console.table(this.props.scripts);
    // console.table(scripts);
    // const { scripts } = this.props;
    return (
      <div>
        TaskPage
        {/* <Terminal /> */}
      </div>
    );
  }
}

TaskPage.defaultProps = {
  scripts: [],
};

TaskPage.propTypes = {
  scripts: PropTypes.array,
};

export default TaskPage;
