const readPackageJson = require('../module/read-package');
const searchDirectories = require('../module/search-directory');

const n = 0;

module.exports = {
  Query: {
    scripts: async (root, { path }) => {
      const result = await readPackageJson(path);
      return result;
    },
    directories: async (root, option) => {
      console.log('reveiced: ', option);
      const result = await searchDirectories(option);
      // result.currentPath = `${n + 1}`;
      console.log('result', result);
      return { ...result };
    },
    // directories() {
    // return new Directories();
    // currentPath(obj) {
    //   console.log('obj', obj);
    //   return obj.currentPath;
    // },
    // childDirs(obj) {
    //   return obj.childDirs;
    // },
    // },
  },
  // Mutation: {
  //   currentDirs: async (root, { path, type }) => {
  //     const result = await searchDirectories(type, path);
  //     return result;
  //   },
  // },
};
