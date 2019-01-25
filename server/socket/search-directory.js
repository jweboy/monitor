const path = require('path');
const { diskDirectories, onlyDirectories } = require('../module/recursive-directory');

// TODO: socket参数耦合 通过event解耦
async function searchDirectory(socket, currentPath) {
  const list = await onlyDirectories(currentPath);
  console.table(list);

  socket.emit('onDir', { path: currentPath, children: list });
}

async function checkSearchAction(socket, { type, name }) {
  // 分隔符，根据系统不同有所区分。
  const separator = path.sep;

  // 前进获取目录
  if (type === 'forward') {
    const currentPath = name != null ? name : process.cwd();

    searchDirectory(socket, currentPath);
  }

  // 后退获取目录
  if (type === 'back') {
    // 目录数组
    let pathNames = name.split(separator);

    // 删除最后一个目录名
    pathNames.splice(pathNames.length - 1, 1);

    // 只剩磁盘符号
    if (pathNames.length === 1) {
      // 磁盘名
      const diskName = pathNames[0] + separator;
      // 指定磁盘对应的目录名称
      const diskChildDirs = await diskDirectories(diskName);

      return socket.emit('onDir', { path: diskName, children: diskChildDirs });
    }

    // 分隔符拼接目录数组
    pathNames = pathNames.join(separator);

    searchDirectory(socket, pathNames);
  }
}

module.exports = checkSearchAction;
