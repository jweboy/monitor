import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { Link } from '@reach/router';
import ErrorBoundary from '../../components/ErrorBoundary';
import LeftBar from '../../stateful-components/LeftBar';

class HomePage extends PureComponent {
  checkIsNotRootUri = (location) => location.pathname !== '/';

  render() {
    const { children, location } = this.props;

    return (
      <ErrorBoundary>
        <Layout style={{ height: '100%' }}>
          {/* {this.checkIsNotRootUri(location) && <Consumer>{({ scripts }) => <LeftBar data={scripts} />}</Consumer>} */}
          {this.checkIsNotRootUri(location) && <LeftBar />}
          {/* <Terminal /> */}
          {this.checkIsNotRootUri(location) && <Link to="/">退出 </Link>}
          {children}
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
