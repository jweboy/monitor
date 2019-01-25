import React, { PureComponent } from 'react';
import { navigate } from '@reach/router';
import ErrorBoundary from '../components/ErrorBoundary';


class Home extends PureComponent {
  componentDidMount = () => {
    // Set default route
    navigate('/project');
  };
  render() {
    const { children } = this.props;

    return <ErrorBoundary>{children}</ErrorBoundary>;
  }
}

export default Home;
