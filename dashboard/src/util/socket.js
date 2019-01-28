import io from 'socket.io-client';

const URL = 'http://localhost:8889';
const socket = io.connect(URL);

// class MonitorSocket extends Socket {
//   constructor() {
//     super();
//     //   if (this.socket != null) {
//     //     this.socket.disconnect();
//     //   }
//     //   socket
//     //   console.log(this.socket.close);
//   }

//   logger(callback = () => {}) {
//     this.socket.on('logger', (data) => callback(data));
//   }
//   emit(name, data) {
//     this.socket.emit(name, data);
//   }
//   on(name, callback = () => {}) {
//     this.socket.on(name, callback);
//   }
// }

export default socket;
