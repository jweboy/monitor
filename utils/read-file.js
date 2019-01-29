const { readFile } = require('./fs');

module.exports = function readFileContent(path) {
  return readFile(path, 'utf-8').then((data) => data);
};
