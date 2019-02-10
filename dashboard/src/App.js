import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Provider, initialState } from './store';
import Router from './views/Router';
import './App.less';

/* eslint-disable */
class App extends Component {
  constructor() {
    super();

    this.state = initialState;
  }
	updateContext = (value) => {
    this.setState((prevState) => ({
      ...prevState,
      ...value,
    }));
  }
	render() {
    const rootStore = {
      ...this.state,
      updateContext: this.updateContext,
    };

		return (
      <Provider value={rootStore}>
        <Router />
      </Provider>
    );
	}
}

export default hot(module)(App);
