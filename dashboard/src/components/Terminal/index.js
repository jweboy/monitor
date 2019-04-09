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
      RendererType: 'dom',
      cursorBlink: true,
      scrollBack: 3,
      tabStopWidth: 3,
    });
    this.terminal.open(termContainer);
  }
  componentDidUpdate(prevProps) {
    const { data, killed } = this.props;
    if (prevProps.data !== data) {
      // TODO: 光标位置初始化
      // this.terminal.addMarker(0);

      if (killed) {
        this.terminal.clear();
      } else {
        this.terminal.write(data);
      }
    }
  }

  render() {
    return <div id="terminal" className={styles.terminal} />;
  }
}

export default Termianal;
