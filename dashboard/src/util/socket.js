import io from 'socket.io-client';

const URL = 'http://localhost:8889';

class Socket {
  constructor() {
    this.socket = io.connect(URL);
  }

  logger(callback = () => {}) {
    this.socket.on('logger', (data) => callback(data));
  }
}

export default Socket;
