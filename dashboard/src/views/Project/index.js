import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Alert, Button } from 'antd';
import { navigate } from '@reach/router';
import { Mutation, Query } from 'react-apollo';
// import Consumer from '../../components/Consumer';
import Loading from '../../components/Loading';
import DirItem from './DirItem';
import { withQuery, withMutation, DIR_MUTATION, DIR_QUERY } from './query';
import styles from './index.less';

class ProjectPage extends Component {
  static defaultProps = {
    dirs: [],
  };
  static propTypes = {
    dirs: PropTypes.arrayOf(PropTypes.object),
  };
  constructor(props) {
    super(props);

    this.state = {
      currentPath: '',
    };
  }

  componentDidMount() {}

  // setCurrentDir(path) {
  //   this.socket.emit('emitDir', { type: 'forward', name: path });
  // }

  // getCurrentChildDirs() {
  //   this.socket.once('onDir', ({ path, children }) => {
  //     this.setState(
  //       {
  //         dirs: children,
  //         currentPath: path,
  //       },
  //       () => {
  //         const { currentPath } = this.state;
  //         const { updateContext } = this.props;

  //         this.socket.emit('startProject', currentPath);
  //         this.socket.on('startProject', (data) => {
  //           const keys = Object.keys(data);
  //           updateContext({ scripts: keys });
  //         });
  //       }
  //     );
  //   });
  // }
  handleClick = (item) => () => {
    const { currentPath } = this.state;
    this.setCurrentDir(`${currentPath}\\${item}`);
  };
  handleBackDir = () => {
    const { currentPath } = this.state;
    this.socket.emit('emitDir', { type: 'back', name: currentPath });
  };
  // handleStartProject = () => {
  //   navigate('/task');
  // };

  render() {
    const { currentPath } = this.state;
    const { dirs } = this.props;
    const iconStyle = { fontSize: 24 };

    console.log(this.props.dirs);

    // {/* {loading && <Loading />} */}

    return (
      <div className="project">
        <div className={styles.container}>
          <div className={styles.header}>
            <Alert message={currentPath} type="success" />
            <Button
              shape="circle"
              icon="up"
              type="primary"
              onClick={this.handleBackDir}
              size="small"
              className={styles.btn}
            />
          </div>
          <ul className={styles.list}>
            {dirs.map((dir) => (
              <DirItem key={dir.id} style={iconStyle} data={dir} />
            ))}
          </ul>
          {/* <Mutation mutation={DIR_MUTATION}>
            {(currentDirs, { loading, error }) => {
              console.log(loading, error);
              return (
                <Button type="primary" className={styles.btn} onClick={currentDirs}>
                  启动项目
                </Button>
              );
            }}
          </Mutation> */}
        </div>
      </div>
    );
  }
}

export default withQuery(ProjectPage);
