const path = require('path');
const checkIsDir = require('./utils/isDir');
const { readdir } = require('./utils/fs');

const testPath = './';

checkIsDir(testPath).then((isDir) => {
  if (isDir) {
    readdir(testPath).then((data) => {
      try {
        const promiseSerial = data.reduce((tasks, child) => {
          const childPath = path.resolve(testPath, child);
          const checkDirTask = checkIsDir(childPath);

          // tasks.push({
          //   task: checkDirTask,
          //   name: child,
          // });
          tasks.push(checkDirTask);

          return tasks;
        }, []);

        // 串行检查是否为目录
        promiseSerial
          .reduce(
            (promiseChain, currentTask) =>
              promiseChain.then((chainResults) =>
                currentTask.then((currentResult) => [...chainResults, currentResult])
              ),
            Promise.resolve([])
          )
          .then((results) => {
            console.log(results);
          });
      } catch (err) {
        throw err;
      }
    });
  }
});

// process.stdout.on('error', (err) => {
//   console.log('stdout error', err);
// })

// 跟踪捕获全局的 Promise 错误
process.on('unhandledRejection', (err) => {
  // TODO:  EPERM: operation not permitted
  console.log('UnhandledRejection error', err);
});
