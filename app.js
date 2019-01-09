const { spawn } = require('child_process');
const EventEmitter = require('events');

const app = require('http').createServer();
const io = require('socket.io')(app);

const emitter = new EventEmitter();

emitter.setMaxListeners(1000);

app.listen(8889, () => {
  console.log('Socket server is running 8889');
});

const childProcess = spawn('node', ['server.js']);

childProcess.stdout.on('data', (buffer) => {
  // console.log('buffer =>', buffer);
  io.on('connection', (socket) => {
    socket.emit('logger', buffer.toString());
  });
});
