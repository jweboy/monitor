import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor() {
    super();

    this.state = {
      error: null,
      errorInfo: null,
      isError: false,
    };
  }

  static getDerivedStateFromError() {
    return { isError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    const { error, errorInfo, isError } = this.state;
    const { children } = this.props;

    if (isError && errorInfo) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          {error && error.toString()}
          {errorInfo.cpmponentStack}
        </div>
      );
    }
    return children;
  }
}

export default ErrorBoundary;
