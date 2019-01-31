const { diskDirectories, onlyDirectories } = require('../utils/recursive-directory');
const { separator, root } = require('../contants/path');

function generateCombinedData(arr = [], currentPath) {
  return arr.reduce((_arr, dirName, index) => {
    _arr.push({ name: dirName, id: index, currentPath });
    return _arr;
  }, []);
}

module.exports = async function searchDirectories({ type = 'forward', path, fileName }) {
  let currentPath = '';

  // 前进获取目录
  if (type === 'forward') {
    if (fileName != null) {
      currentPath = path + separator + fileName;
    } else {
      currentPath = path || root;
    }
    console.log(currentPath);
  }

  // 后退获取目录
  if (type === 'back') {
    // 目录数组
    const pathNames = path.split(separator);

    // 删除最后一个目录名
    pathNames.splice(pathNames.length - 1, 1);

    // 只剩磁盘符号
    if (pathNames.length === 1) {
      // 磁盘名
      const diskName = pathNames[0] + separator;
      // 指定磁盘对应的目录名称
      const diskChildDirs = await diskDirectories(diskName);

      return diskChildDirs;
    }

    // 组合路径名称集
    currentPath = pathNames.join(separator);
  }

  const dirNames = await onlyDirectories(currentPath);

  return {
    currentPath,
    childDirs: generateCombinedData(dirNames, currentPath),
  };
};
