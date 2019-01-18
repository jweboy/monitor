import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { AppContext, initialState } from './store';
import Router from './components/Router';
import './App.less';

/* eslint-disable */
class App extends Component {
  constructor() {
    super();

    this.state = initialState;
  }
	displayName = App
	UNSAFE_componentWillMount() {
		console.warn('will mount!!~~');
	}
	render() {
		console.log('render！~~', this.state);
		return (
      <AppContext.Provider value={this.state}>
        <div className="app">
          <Router />
        </div>
      </AppContext.Provider>
		);
	}
}

export default hot(module)(App);
