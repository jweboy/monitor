import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Alert, Button } from 'antd';
import { navigate } from '@reach/router';
import { Query } from 'react-apollo';
// import Consumer from '../../components/Consumer';
import Loading from '../../components/Loading';
import DirItem from './DirItem';
import { DIR_QUERY, withQuery } from './query';
import styles from './index.less';
import BackButton from './BackButton';

@withQuery
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
    const iconStyle = { fontSize: 24 };
    const { directories } = this.props;

    console.warn(directories);
    console.table(directories.childDirs, ['currentPath']);
    // {/* {loading && <Loading />} */}

    return (
      <div className="project">
        <div className={styles.container}>
          <div className={styles.header}>
            {/* <Alert message={currentPath} type="success" /> */}
            {/* <BackButton currentPath={currentPath} /> */}
          </div>
          <ul className={styles.list}>
            {directories.childDirs.map((dir) => (
              <DirItem key={dir.id} style={iconStyle} data={dir} />
            ))}
          </ul>
        </div>
        <Button type="primary" className={styles.btn}>
          启动项目
        </Button>
      </div>
    );
  }
}

export default ProjectPage;
