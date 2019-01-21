const path = require('path');
const recursiveDirectory = require('../module/recursive-directory');
const { readdir } = require('../utils/fs');

// TODO: socket参数耦合 通过event解耦
async function searchDirectory(socket, currentPath) {
  const list = await recursiveDirectory(currentPath);

  socket.emit('onDir', { path: currentPath, children: list });
}

function checkSearchAction(socket, { type, name }) {
  // 前进获取目录
  if (type === 'forward') {
    const currentPath = name != null ? name : process.cwd();

    searchDirectory(socket, currentPath);
  }

  // 后退获取目录
  if (type === 'back') {
    // 分隔符，根据系统不同有所区分。
    const separator = path.sep;
    // 目录数组
    let pathNames = name.split(separator);

    // 只剩磁盘符号
    if (pathNames.length === 1) {
      readdir(pathNames[0]).then((data) => {
        console.log(data);
      });
      return socket.emit('onDir', { path: pathNames[0], children: [] });
    }

    // 删除最后一个目录名
    pathNames.splice(pathNames.length - 1, 1);
    // 更新目录数组
    pathNames = pathNames.join(separator);

    searchDirectory(socket, pathNames);
  }
}

module.exports = checkSearchAction;
