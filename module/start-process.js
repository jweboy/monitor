const { exec, execSync } = require('child_process');

const LISTEN_STREAM = 'LISTEN_STREAM';

module.exports = async function startProcess(type, pubsub, opts) {
  const { script, path } = opts;
  console.log(script, path);

  const scriptProcess = exec(script, {
    cwd: path,
  });

  // if (type === 'kill') {
  //   return scriptProcess.kill();
  // }

  scriptProcess.stdout.on('data', (buffer) => {
    console.log('Stdout buffer: ', buffer);
    pubsub.publish(LISTEN_STREAM, {
      streamListened: {
        data: buffer,
      },
    });
  });

  // Catch error
  scriptProcess.stdout.on('error', (err) => {
    console.log('Stdout error: ', err);
  });

  scriptProcess.stderr.on('data', (err) => {
    console.log('Stderr error: ', err.toString());
  });

  // Close
  scriptProcess.stdout.on('close', (code, signal) => {
    console.log('Close: code is %s, signal is %s.', code, signal);
  });

  // Exit
  scriptProcess.stdout.on('exit', (code, signal) => {
    console.log('Exit: code is %s, signal is %s.', code, signal);
  });

  // console.log('data => ', data);
  // scriptProcess.kill('SIGTERM');
};
