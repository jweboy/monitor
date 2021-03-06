const checkIsDir = require('./isDir');
const { readdir } = require('./fs');

/**
 * 获取当前目录中所有的子目录名称，不包含隐藏目录
 * @param {string} path 需要获取的目录名
 */
function recursiveDirectory(path) {
  /**
   * @param options withFileTypes = true
   * @return fs.Dirent(node版本需要不小于10.10.0)
   */
  return readdir(path, { withFileTypes: true }).then((files) => {
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

    return childDirs;
  });
}

function diskDirectories(path) {
  return recursiveDirectory(path);
}

function onlyDirectories(path) {
  return checkIsDir(path).then((isDir) => {
    if (isDir) {
      return recursiveDirectory(path);
    }
  });
}

module.exports = {
  diskDirectories,
  onlyDirectories,
};

// // 跟踪捕获全局的 Promise 错误
// process.on('unhandledRejection', (err) => {
//   // TODO:  EPERM: operation not permitted
//   console.log('UnhandledRejection error', err);
// });
