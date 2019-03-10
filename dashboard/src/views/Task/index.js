import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { LeftMenu, Terminal } from '../../components';
// import { } from 'rematch';
import { withQuery, mapDispatchToProps } from './query';

@connect(
  (state) => {
    console.log(state);
    return state;
  },
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
      scripts: [],
    };
  }
  // static getDerivedStateFromProps(props, state) {
  //   if (props.scripts !== state.scripts && props.scripts.length > 0) {
  //     return {
  //       scripts: props.scripts,
  //     };
  //   }
  //   return null;
  // }
  componentDidMount() {
    console.warn(this.props);
    // const { updateMenuList } = this.props;
    // updateMenuList();
  }
  render() {
    const { scripts } = this.state;
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

// TaskPage.defaultProps = {
//   scripts: [],
// };

// TaskPage.propTypes = {
//   scripts: PropTypes.array,
// };
const TaskPageWithQuery = withQuery(TaskPage);

export default TaskPage;
// export default connect()(TaskPageWithQuery);
