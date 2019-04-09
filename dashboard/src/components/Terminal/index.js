import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Terminal } from 'xterm';
// import * as fit from 'xterm/lib/addons/fit/fit';
import styles from './index.less';

class Termianal extends Component {
  static defaultProps = {
    streamListened: {},
  };
  constructor(props) {
    super(props);

    this.terminal = {};
  }
  componentDidMount() {
    // Terminal.applyAddon(fit);
    const termContainer = document.getElementById('terminal');
    this.terminal = new Terminal({
      cursorBlink: true, // 光标是否闪烁
      cursorStyle: null, // 光标样式  null | 'block' | 'underline' | 'bar'
    });
    this.terminal.open(termContainer);
  }
  componentDidUpdate(prevProps) {
    const { data, killed } = this.props;
    if (prevProps.data !== data) {
      if (killed) {
        this.terminal.clear();
        this.terminal.addMarker(0);
      } else {
        this.terminal.writeln(data);
      }
    }
  }
  componentWillUnmount() {
    this.terminal.dispose();
  }

  render() {
    return <div id="terminal" className={styles.terminal} />;
  }
}

export default Termianal;
