const readPackageJson = require('../module/read-package');
const searchDirectories = require('../module/search-directory');

module.exports = {
  Query: {
    scripts: async (root, { path }) => {
      const result = await readPackageJson(path);
      return result;
    },
    dirs: async (root, { path, type }) => {
      const result = await searchDirectories(type, path);
      return result;
    },
  },
};
