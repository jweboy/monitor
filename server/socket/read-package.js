const path = require('path');
const { stat, readFile } = require('../utils/fs');

const PACKAGEJSONFILE = 'package.json';

function readPackageJson(socket, projectPath) {
  // TODO: 常量需抽离
  // 分隔符，根据系统不同有所区分。
  const separator = path.sep;
  const targetFile = projectPath + separator + PACKAGEJSONFILE;
  stat(targetFile)
    .then(() => {
      readFile(targetFile, { encoding: 'utf-8' }).then((content) => {
        const config = JSON.parse(content);
        socket.emit('startProject', config.scripts);
      });
    })
    .catch((err) => {
      // 无此文件
      // TODO: code需抽离
      if (err.code === 'ENOENT') {
        socket.emit('startProject', 'error');
      }
    });
}

module.exports = readPackageJson;
