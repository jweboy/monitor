const readPackageJson = require('../module/read-package');

module.exports = {
  Query: {
    scripts: async (root, { path }) => {
      const result = await readPackageJson(path);
      return result;
    },
  },
  //   name: 'jweboy',
  //   user: {
  //     id: 1,
  //     name: 'bingo',
  //   },
  //   dir: [{ id: 1, name: 'as' }, { id: 2, name: 'asdadsas' }],
};
