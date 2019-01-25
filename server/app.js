const { spawn } = require('child_process');

const app = require('http').createServer();
const io = require('socket.io')(app);

const searchDirectory = require('./socket/search-directory');
const readPackageJson = require('./socket/read-package');

app.listen(8889, () => {
  console.log('Socket server is running 8889');
});

const childProcess = spawn('node', ['./server.js']);

io.on('connection', (socket) => {
  /* =============================== socket ================================ */
  /**
   * 获取指定目录中所有子目录的名称列表
   */
  socket.on('emitDir', (options) => searchDirectory(socket, options));
  socket.on('startProject', (path) => readPackageJson(socket, path));

  /* ============================ child_process ============================= */
  // Catch buffer
  childProcess.stdout.on('data', (buffer) => {
    socket.emit('logger', buffer.toString());
    console.log('Stdout buffer: ', buffer.toString());
  });

  // Catch error
  childProcess.stdout.on('error', (err) => {
    console.log('Stdout error: ', err);
  });

  childProcess.stderr.on('data', (err) => {
    console.log('Stderr error: ', err.toString());
  });

  // Close
  childProcess.stdout.on('close', (code, signal) => {
    console.log('Close: code is %s, signal is %s.', code, signal);
  });

  // Exit
  childProcess.stdout.on('exit', (code, signal) => {
    console.log('Exit: code is %s, signal is %s.', code, signal);
  });
});
