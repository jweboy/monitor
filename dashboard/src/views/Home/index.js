import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { Link } from '@reach/router';
import ErrorBoundary from '../../components/ErrorBoundary';
import LeftBar from '../../stateful-components/LeftBar';
import styles from './index.less';

class HomePage extends Component {
  checkIsNotRootUri = (location) => location.pathname !== '/';

  render() {
    const { children, location } = this.props;

    return (
      <ErrorBoundary>
        <Layout style={{ height: '100%' }}>
          {this.checkIsNotRootUri(location) && <LeftBar />}
          <Layout className={styles.main}>
            {this.checkIsNotRootUri(location) && <Link to="/">退出 </Link>}
            {children}
          </Layout>
        </Layout>
      </ErrorBoundary>
    );
  }
}

HomePage.defaultProps = {
  children: <div />,
  location: {},
};

HomePage.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
};

export default HomePage;
