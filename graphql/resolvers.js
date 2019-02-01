const readPackageJson = require('../module/read-package');
const searchDirectories = require('../module/search-directory');

module.exports = {
  Query: {
    scripts: async (root, { path }) => {
      const result = await readPackageJson(path);
      return result;
    },
    directories: async (root, option) => {
      const result = await searchDirectories(option);
      return result;
    },
  },
  Mutation: {
    directories: async (root, option) => {
      const result = await searchDirectories(option);
      return result;
    },
  },
};
