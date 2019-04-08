import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Subscription } from 'react-apollo';
import styles from './index.less';
import { Terminal } from '../../components';
import { withQuery, mapDispatchToProps, STREAM_SUBSCRIPTION, withSubscribe } from './query';

const Termal = withSubscribe(Terminal);

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
  componentDidMount() {
    // const { subscribeToMore } = this.props;
    // subscribeToMore({
    //   document: STREAM_SUBSCRIPTION,
    //   updateQuery: (prev, { subscriptionData }) => {
    //     console.warn(prev, subscriptionData);
    //   },
    // });
  }

  handleClick = () => {
    console.warn(this.props);
  };

  render() {
    console.warn(this.props);
    return (
      <div>
        <div className={styles.header}>
          <Button type="danger" onClick={this.handleClick}>
            停止
          </Button>
        </div>
        {/* <Subscription subscription={STREAM_SUBSCRIPTION} variables={{ path: 'haha' }}>
          {({ data }) => {
            const { streamListened } = data;
            return <div>{streamListened.data}</div>;
          }}
        </Subscription> */}
        {/* <Subscription subscription={STREAM_SUBSCRIPTION}>
          {({ data }) => <Terminal data={data.streamListened} />}
        </Subscription> */}
        <Termal />
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
