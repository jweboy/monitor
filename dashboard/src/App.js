import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Button } from 'antd';
// import nodejs from './assets/nodejs.png'
import nodejs from './assets/nodejs.png';
// import jsLogo from './assets/js-logo.svg';
import jsGif from './assets/js.gif';
import nodejsDay from './assets/nodejsDay.jpg';
import { Test, TestDir, TestLess } from './components';
import './App.less';

/* eslint-disable */
class App extends Component {
	displayName = App
	UNSAFE_componentWillMount() {
		console.warn('will mount!!~~');
	}
	componentDidMount() {
		console.log('ok', API_URL);
	}
	render() {
		console.log('render！~~');
		return (
			<div className="app">

			</div>
		);
	}
}

export default hot(module)(App);
