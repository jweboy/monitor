const readPackageJson = require('../module/read-package');

const scriptTypeDefs = `
    type Script {
      id: ID!
      name: String
      value: String
    }

    # Extend the root Query type.
    extend type Query {
        scripts(path: String): [Script]
    }
`;

const scriptResolvers = {
  Query: {
    scripts: (root, { path }) => readPackageJson(path),
  },
};

module.exports = {
  scriptTypeDefs,
  scriptResolvers,
};
