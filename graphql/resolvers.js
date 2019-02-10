const readPackageJson = require('../module/read-package');
const searchDirectories = require('../module/search-directory');

module.exports = {
  Query: {
    scripts: (root, { path }) => readPackageJson(path),
    directories: (root, option) => searchDirectories(option),
  },
  Mutation: {
    directories: (root, option) => searchDirectories(option),
  },
};
