import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Terminal } from 'xterm';
// import * as fit from 'xterm/lib/addons/fit/fit';
import styles from './index.less';

export class Termianal extends Component {
  static defaultProps = {
    streamListened: {},
  }
  constructor(props) {
    super(props);

    this.terminal = {};
  }
  componentDidMount() {
    // Terminal.applyAddon(fit);
    const termContainer = document.getElementById('terminal');
    this.terminal = new Terminal({
      RendererType: 'dom',
      cursorBlink: true,
      scrollBack: 3,
      tabStopWidth: 3,
    });
    this.terminal.open(termContainer);
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const { streamListened } = this.props;
      this.terminal.write(streamListened.data && streamListened.data.trim() + '\n');
      // TODO: 替换回车为换行符
    }
  }

  render() {
    return <div id="terminal" className={styles.terminal} />;
  }
}

export default Termianal;
