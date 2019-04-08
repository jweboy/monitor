const readPackageJson = require('../module/read-package');
const searchDirectories = require('../module/search-directory');

module.exports = {
  Query: {
    scripts: async (_, { path }) => readPackageJson(path),
    directories: (_, option) => searchDirectories(option),
  },
  Mutation: {
    directories: (_, option) => searchDirectories(option),
  },
};
