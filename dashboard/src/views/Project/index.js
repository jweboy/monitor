import React, { Component } from 'react';
import { Icon, Alert, Button } from 'antd';
import { navigate } from '@reach/router';
import Consumer from '../../components/Consumer';
import styles from './index.less';

class ProjectPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dirs: [],
      currentPath: '',
    };

    this.socket = props.socket;
  }

  componentDidMount() {
    this.setCurrentDir();
    this.getCurrentChildDirs();
  }

  setCurrentDir(path) {
    this.socket.emit('emitDir', { type: 'forward', name: path });
  }

  getCurrentChildDirs() {
    this.socket.once('onDir', ({ path, children }) => {
      this.setState(
        {
          dirs: children,
          currentPath: path,
        },
        () => {
          const { currentPath } = this.state;
          const { updateContext } = this.props;

          this.socket.emit('startProject', currentPath);
          this.socket.on('startProject', (data) => {
            const keys = Object.keys(data);
            updateContext({ scripts: keys });
          });
        }
      );
    });
  }

  handleClick = (item) => () => {
    const { currentPath } = this.state;
    this.setCurrentDir(`${currentPath}\\${item}`);
  };

  handleBackDir = () => {
    const { currentPath } = this.state;
    this.socket.emit('emitDir', { type: 'back', name: currentPath });
  };

  handleStartProject = () => {
    navigate('/task');
  };

  render() {
    const { dirs, currentPath } = this.state;
    const iconStyle = { fontSize: 24 };
    return (
      <div className="project">
        {/* <Button type="primary" className={styles.btn} onClick={this.handleStartProject}>
          启动项目
        </Button> */}
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
              <li key={dir} className={styles.item} onClick={this.handleClick(dir)}>
                <Icon type="folder" theme="twoTone" style={iconStyle} />
                <span className={styles.text}>{dir}</span>
              </li>
            ))}
          </ul>
          <Button type="primary" className={styles.btn} onClick={this.handleStartProject}>
            启动项目
          </Button>
        </div>
      </div>
    );
  }
}

export default Consumer(ProjectPage);
