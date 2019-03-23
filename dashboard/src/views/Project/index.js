import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';
// import { navigate } from '@reach/router';
import { pure, compose } from 'recompose';
// import { connect } from 'react-redux';
import { displayLoadingState } from '../../components/Loading';
import DirItem from './DirItem';
import { withQuery } from './query';
import styles from './index.less';
import BackButton from './BackButton';
import JumpButton from './JumpButton';

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
          <JumpButton currentPath={currentPath} />
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
