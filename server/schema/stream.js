const { PubSub } = require('apollo-server');
const task = require('../module/task');

const pubsub = new PubSub();
const LISTEN_STREAM = 'LISTEN_STREAM';

const streamTypeDefs = `
    type Stream {
        killed: Boolean
        data: String
    }

    extend type Subscription {
        streamListened: Stream
    }

    extend type Mutation {
        listenStream(path: String, script: String): Stream
        killStream: Stream
    }
`;

const streamResolvers = {
  Subscription: {
    streamListened: {
      subscribe: () => pubsub.asyncIterator([LISTEN_STREAM, 'STREAM_KILLED']),
    },
  },
  Mutation: {
    listenStream: (_, args) => task.run(pubsub, args),
    killStream: () => task.stop('kill', pubsub),
  },
};

module.exports = {
  streamTypeDefs,
  streamResolvers,
};
