import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Terminal } from 'xterm';
import * as fit from 'xterm/lib/addons/fit/fit';
// import Socket from '../../util/socket';

export class Termianal extends Component {
  constructor() {
    super();

    Terminal.applyAddon(fit);

    this.state = {
      // socket: Socket,
      terminal: new Terminal({
        rows: 30,
      }),
    };
  }
  componentDidMount() {
    // const { socket, terminal } = this.state;
    const termContainer = document.getElementById('terminal');
    terminal.open(termContainer);
    terminal.fit();

    // socket.logger((data) => {
    //   terminal.write(data);
    // });
  }

  render() {
    return <div id="terminal" />;
  }
}

export default Termianal;
