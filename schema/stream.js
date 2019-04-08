const { PubSub, withFilter } = require('apollo-server');
const startProcess = require('../module/start-process');

const pubsub = new PubSub();
const LISTEN_STREAM = 'LISTEN_STREAM';

const streamTypeDefs = `
    type Stream {
        timestamp: Int
        data: String
    }

    extend type Subscription {
        streamListened: Stream
    }

    extend type Mutation {
        listenStream(path: String, script: String): Stream
    }
`;

const streamResolvers = {
  Subscription: {
    streamListened: {
      subscribe: () => pubsub.asyncIterator([LISTEN_STREAM]),
    },
  },
  Mutation: {
    listenStream: async (_, args) => startProcess('listen', pubsub, args),
    // killStream: () => startProcess('kill'),
  },
};

module.exports = {
  streamTypeDefs,
  streamResolvers,
};
