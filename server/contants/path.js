const path = require('path');

const BASEPATH = process.cwd();

function getFilePath(filePath) {
  return path.join(BASEPATH, filePath);
}

module.exports = {
  // 分隔符，根据系统不同有所区分。
  separator: path.sep,
  root: BASEPATH,
  schema: getFilePath('graphql/schema'),
};
