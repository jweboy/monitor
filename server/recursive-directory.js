// const path = require('path');
const checkIsDir = require('./utils/isDir');
const { readdir } = require('./utils/fs');
// const promiseSerial = require('./utils/promiseSerial');

const testPath = '/';

function recursiveDirectory() {
  checkIsDir(testPath).then((isDir) => {
    if (isDir) {
      /**
       * @param options withFileTypes = true
       * @return fs.Dirent(node版本需要不小于10.10.0)
       */
      readdir(testPath, { withFileTypes: true }).then((files) => {
        // @param dirent {fs.Dirent class}
        const childDirs = files.reduce((names, dirent) => {
          // 判断是否为目录
          const isChildDir = dirent.isDirectory();
          // 判断目录是否可见
          const isChildDirVisible = dirent.name.indexOf('.') === -1;

          if (isChildDir && isChildDirVisible) {
            names.push(dirent.name);
          }
          return names;
        }, []);
        console.log(childDirs);
      });
    }
  });
}

recursiveDirectory();
// process.stdout.on('error', (err) => {
//   console.log('stdout error', err);
// })

// 跟踪捕获全局的 Promise 错误
process.on('unhandledRejection', (err) => {
  // TODO:  EPERM: operation not permitted
  console.log('UnhandledRejection error', err);
});
