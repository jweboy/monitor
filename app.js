const { spawn } = require('child_process');

const app = require('http').createServer();
const io = require('socket.io')(app);

app.listen(8889, () => {
  console.log('Socket server is running 8889');
});

const childProcess = spawn('node', ['server.js']);

io.on('connection', (socket) => {
  childProcess.stdout.on('data', (buffer) => {
    socket.emit('logger', buffer.toString());
    console.log('buffer =>', buffer.toString());
  });
});
