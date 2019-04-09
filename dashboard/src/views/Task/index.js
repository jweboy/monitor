import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { Badge } from 'antd';
import styles from './index.less';
import { Terminal } from '../../components';
import { withQuery, mapDispatchToProps, withSubscribe } from './query';
import StopButton from './StopButton';

// const Termal = withSubscribe(Terminal);

@connect(
  () => ({}),
  mapDispatchToProps
)
@withQuery
@withSubscribe
class TaskPage extends Component {
  static defaultProps = {
    streamListened: {
      killed: true,
      data: '',
    },
  };
  static getStatus(killed) {
    if (killed) {
      return {
        text: '已停止',
        color: 'red',
        status: 'error',
      };
    }
    return {
      text: '运行中',
      status: 'success',
      color: 'green',
    };
  }
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
  componentDidMount() {
    // const { subscribeToMore } = this.props;
    // subscribeToMore({
    //   document: STREAM_SUBSCRIPTION,
    //   updateQuery: (prev, { subscriptionData }) => {
    //     console.warn(prev, subscriptionData);
    //   },
    // });
  }

  render() {
    console.warn(this.props);
    const { streamListened } = this.props;
    return (
      <div>
        <div className={styles.header}>
          {/* subscribeToMore  https://www.apollographql.com/docs/react/advanced/subscriptions */}
          <StopButton killed={streamListened.killed} />
          <Badge {...TaskPage.getStatus(streamListened.killed)} />
        </div>
        <Terminal data={streamListened.data} />
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
