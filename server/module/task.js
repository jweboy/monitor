const { exec, spawn } = require('child_process');
const execa = require('execa');
const { TASK_LOG_ADDED, TASK_LOG_CLEAR } = require('../contants/graphql');
const { log } = require('../utils/logger');
const { terminate } = require('../utils/terminate');
// const { notify } = require('../utils/notification');

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

function startProcess(opts = {}, pubsub) {
  const { script, path } = opts;
  log('script => ', script);
  log('path => ', path);

  child = execa.shell(script, {
    cwd: path,
    stdio: ['inherit', 'pipe', 'pipe'],
  });

  const outPipe = logPipe(chunk => {
    // log(chunk);
    pubsub.publish(TASK_LOG_ADDED, {
      streamListened: {
        data: chunk,
        killed: child.killed,
      },
    });
  });

  child.stdout.on('data', (buffer) => {
    // console.log('Stdout buffer: ', buffer.toString());
    outPipe.add(buffer.toString());
  });

  const errPipe = logPipe(chunk => {
    // log(chunk);
    pubsub.publish(TASK_LOG_ADDED, {
      streamListened: {
        data: chunk,
        killed: child.killed,
      },
    });
  })

  child.stderr.on('data', (buffer) => {
    // console.log('Stderr error: ', buffer.toString());
    errPipe.add(buffer.toString());
  });

  // Close
  child.stdout.on('close', (code, signal) => {
    log(`Close: code is ${code}, signal is ${signal}.`);
    log('isKilled', child.killed);
    log('connected', child.connected);
    // log(child.killed);
    // notify({
    //   title: 'Task error',
    //   message: 'Task is closed',
    // });
    // process.exit(1);
  });

  child.on('error', err => {
    log('err', error);
  })

  // Exit
  child.stdout.on('exit', (code, signal) => {
    console.log('Exit: code is %s, signal is %s.', code, signal);
  });
}

async function stopProcess(pubsub) {
  try{
    const { success, error } = await terminate(child, '/Users/jianglei/ReactProjects/react-webpack-toolkit');

    if (success) {
      log('Terminate process successful.');
      return pubsub.publish(TASK_LOG_CLEAR, {
        streamListened: {
          data: '',
          killed: child.killed,
        },
      });
    } else if (error) {
      log('Terminate process failed.');
      log(error);
    } else {
      log('Unknow error.');
    }
  } catch(err) {
    log(`Can't terminate process ${child.pid}`);
    log(err);
  }
}

module.exports = {
  run: startProcess,
  stop: stopProcess,
};
