import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { Link } from '@reach/router';
import ErrorBoundary from '../../components/ErrorBoundary';
import LeftMenu from '../../components/LeftMenu';
import { Consumer } from '../../store';

class HomePage extends PureComponent {
  checkIsNotRootUri = (location) => location.pathname !== '/';

  render() {
    const { children, location } = this.props;

    return (
      <ErrorBoundary>
        <Layout style={{ height: '100%' }}>
          {/* {this.checkIsNotRootUri(location) && <Consumer>{({ scripts }) => <LeftMenu data={scripts} />}</Consumer>} */}
          {this.checkIsNotRootUri(location) && <LeftMenu data={[]} />}
          {/* <Terminal /> */}
          {this.checkIsNotRootUri(location) && <Link to="/">退出</Link>}
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
