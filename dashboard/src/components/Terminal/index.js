import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Terminal } from 'xterm';
// import * as fit from 'xterm/lib/addons/fit/fit';
import styles from './index.less';

export class Termianal extends Component {
  componentDidMount() {
    // Terminal.applyAddon(fit);
    const termContainer = document.getElementById('terminal');
    const terminal = new Terminal({
      RendererType: 'dom',
      cursorBlink: true,
      scrollBack: 3,
      tabStopWidth: 3,
    });
    terminal.open(termContainer);
    // terminal.fit();
    // socket.logger((data) => {
    //   terminal.write(data);
    // });
  }

  render() {
    return <div id="terminal" className={styles.terminal} />;
  }
}

export default Termianal;
