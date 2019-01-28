const { stat } = require('./fs');

module.exports = function checkIsDir(path) {
  if (path == null) {
    throw new Error('Must have a path.');
  }
  return new Promise((resolve) =>
    stat(path).then((data) => {
      const isDir = data.isDirectory();
      resolve(isDir);
      // if (isDir) {
      //   resolve(isDir);
      // } else {
      //   reject(new Error('Not a directory.'));
      // }
    })
  );
};
