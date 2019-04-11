// const { exec, spawn } = require('child_process');
const execa = require('execa');
const { log } = require('../utils/logger');

const LISTEN_STREAM = 'LISTEN_STREAM';
let child = null;

function logPipe(action) {
  const duration = 300;

  let size = 0;
  let chunk = '';
  let timeout = null;

  const flush = () => {
    if (!size) return;

    action(chunk);
    chunk = '';
    size = 0;
  };

  const add = (str) => {
    chunk += str;
    /* eslint-disable */
    size++;

    if (size === 30) {
      flush();
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(flush, duration);
    }
  };

  return {
    add,
  };
}

async function startProcess(pubsub, opts = {}) {
  // console.log('process', child);
  // if (type === 'kill') {
  //   child.kill();
  //   console.log('pid', child.pid, child.killed);
  //   return pubsub.publish('STREAM_KILLED', {
  //     streamListened: {
  //       data: '',
  //       killed: child.killed,
  //     },
  //   });
  // }

  const { script, path } = opts;
  console.log('param', script, path);

  child = execa.shell(script, {
    cwd: path,
    stdio: ['pipe', 'pipe', 'pipe'],
  });

  const outPipe = logPipe(chunk => {
    log(chunk);
    pubsub.publish(LISTEN_STREAM, {
      streamListened: {
        data: chunk,
        killed: child.killed,
      },
    });
  });

  child.stdout.on('data', (buffer) => {
    console.log('Stdout buffer: ', buffer.toString());
    outPipe.add(buffer.toString());
  });

  const errPipe = logPipe(chunk => {
    log(chunk);
    pubsub.publish(LISTEN_STREAM, {
      streamListened: {
        data: chunk,
        killed: child.killed,
      },
    });
  })

  child.stderr.on('data', (buffer) => {
    console.log('Stderr error: ', buffer.toString());
    errPipe.add(buffer.toString());
  });

  // Close
  child.stdout.on('close', (code, signal) => {
    console.log('Close: code is %s, signal is %s.', code, signal);
    // process.exit(1);
  });

  // Exit
  child.stdout.on('exit', (code, signal) => {
    console.log('Exit: code is %s, signal is %s.', code, signal);
  });

  // console.log('data => ', data);
  // child.kill('SIGTERM');
}

module.exports = {
  run: startProcess,
};
