import io from 'socket.io-client';

const URL = 'http://localhost:8889';

class Socket {
  constructor() {
    if (this.socket != null) {
      this.socket.disconnect();
    }
    this.socket = io.connect(URL);
  }

  logger(callback = () => {}) {
    this.socket.on('logger', (data) => callback(data));
  }
  emitDir(data) {
    this.socket.emit('emitDir', data);
  }
  onDir(callback = () => {}) {
    this.socket.on('onDir', (data) => callback(data));
  }
}

export default Socket;
