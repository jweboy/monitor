import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button } from 'antd';
import { navigate } from '@reach/router';
import { pure, compose } from 'recompose';
import { displayLoadingState } from '../../components/Loading';
import DirItem from './DirItem';
import { withQuery } from './query';
import styles from './index.less';
import BackButton from './BackButton';

class ProjectPage extends Component {
  static defaultProps = {
    directories: {
      childDirs: [],
    },
  };
  static propTypes = {
    directories: PropTypes.shape({
      childDirs: PropTypes.array,
    }),
  };
  constructor(props) {
    super(props);

    this.state = {};
  }
  handleClick() {
    navigate('/task');
  }
  render() {
    const { directories } = this.props;
    const currentPath = directories.currentPath;

    // console.log('Parent: ', directories);
    // console.table(directories.childDirs, ['currentPath']);
    return (
      <div className="project">
        <div className={styles.container}>
          <div className={styles.header}>
            <Alert message={currentPath} type="success" />
            <BackButton currentPath={currentPath} />
          </div>
          <ul className={styles.list}>
            {directories.childDirs.map((dir) => (
              <DirItem
                key={dir.id}
                data={{
                  ...dir,
                  currentPath,
                }}
              />
            ))}
          </ul>
          <Button type="primary" className={styles.btn} onClick={this.handleClick} style={{ marginRight: 30 }}>
            启动项目
          </Button>
        </div>
      </div>
    );
  }
}

export default compose(
  withQuery,
  displayLoadingState,
  pure
)(ProjectPage);
