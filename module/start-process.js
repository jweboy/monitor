const { exec } = require('child_process');

const LISTEN_STREAM = 'LISTEN_STREAM';
let scriptProcess = null;

module.exports = async function startProcess(type, pubsub, opts = {}) {
  // console.log('process', scriptProcess);
  if (type === 'kill') {
    scriptProcess.kill();
    console.log('pid', scriptProcess.pid, scriptProcess.killed);
    return pubsub.publish('STREAM_KILLED', {
      streamListened: {
        data: '',
        killed: scriptProcess.killed,
      },
    });
  }

  if (type === 'listen') {
    const { script, path } = opts;
    console.log('param', script, path);

    scriptProcess = exec(script, {
      cwd: path,
    });
  }

  scriptProcess.stdout.on('data', (buffer) => {
    // console.log('Stdout buffer: ', buffer);
    pubsub.publish(LISTEN_STREAM, {
      streamListened: {
        data: buffer,
        killed: scriptProcess.killed,
      },
    });
  });

  // Catch error
  scriptProcess.stdout.on('error', (err) => {
    console.log('Stdout error: ', err);
  });

  scriptProcess.stderr.on('data', (err) => {
    // console.log('Stderr error: ', err.toString());
    pubsub.publish(LISTEN_STREAM, {
      streamListened: {
        data: err,
        killed: scriptProcess.killed,
      },
    });
  });

  // Close
  scriptProcess.stdout.on('close', (code, signal) => {
    console.log('Close: code is %s, signal is %s.', code, signal);
    // process.exit(1);
  });

  // Exit
  scriptProcess.stdout.on('exit', (code, signal) => {
    console.log('Exit: code is %s, signal is %s.', code, signal);
  });

  // console.log('data => ', data);
  // scriptProcess.kill('SIGTERM');
};
