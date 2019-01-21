import React, { PureComponent } from 'react';
import { initialState } from '../store';

class ProjectPage extends PureComponent {
  constructor() {
    super();

    this.state = {
      socket: initialState.socket,
      dirs: [],
      currentPath: '',
    };
  }

  componentDidMount() {
    this.setCurrentDir();
    this.getCurrentChildDirs();
  }

  setCurrentDir(path) {
    const { socket } = this.state;
    socket.emitDir({ type: 'forward', name: path });
  }

  getCurrentChildDirs() {
    const { socket } = this.state;
    socket.onDir(({ path, children }) => {
      this.setState({
        dirs: children,
        currentPath: path,
      });
    });
  }

  handleClick = (item) => () => {
    const { currentPath } = this.state;
    this.setCurrentDir(`${currentPath}\\${item}`);
  };

  handleBackDir = () => {
    const { socket, currentPath } = this.state;
    socket.emitDir({ type: 'back', name: currentPath });
  };

  render() {
    const { dirs, currentPath } = this.state;
    return (
      <ul>
        <span>{currentPath}</span>
        <p onClick={this.handleBackDir}>后退</p>
        {dirs.map((dir) => (
          <li key={dir} onClick={this.handleClick(dir)}>
            {dir}
          </li>
        ))}
      </ul>
    );
  }
}

export default ProjectPage;
