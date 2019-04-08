const searchDirectories = require('../module/search-directory');

const directoryTypeDefs = `
    type DirInfo {
        id: ID!
        name: String
    }
    
    type Directory {
        childDirs: [DirInfo]
        currentPath: String
    }

    # Extend the root Query type.
    extend type Query {
        directories(type: String, path: String, fileName: String): Directory
    }
`;

const directoryResolvers = {
  Query: {
    directories: (root, opts) => searchDirectories(opts),
  },
};

module.exports = {
  directoryTypeDefs,
  directoryResolvers,
};
