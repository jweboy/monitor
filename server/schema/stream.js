const { PubSub } = require('apollo-server');
const task = require('../module/task');
const { TASK_LOG_ADDED, TASK_LOG_CLEAR } = require('../contants/graphql');

const pubsub = new PubSub();

const streamTypeDefs = `
    type Stream {
        killed: Boolean
        data: String
    }

    extend type Subscription {
        streamListened: Stream
        taskKilled: Stream
    }

    extend type Mutation {
        listenStream(path: String, script: String): Stream
        killStream: Stream
    }
`;

const streamResolvers = {
  Subscription: {
    streamListened: {
      subscribe: () => {
        console.log('start');
        return pubsub.asyncIterator([TASK_LOG_ADDED, TASK_LOG_CLEAR]);
      },
    },
    taskKilled: {
      subscribe: () => {
        console.log('clear');
        return pubsub.asyncIterator([TASK_LOG_CLEAR]);
      },
    },
  },
  Mutation: {
    listenStream: (_, args) => task.run(args, pubsub),
    killStream: () => task.stop(pubsub),
  },
};

module.exports = {
  streamTypeDefs,
  streamResolvers,
};
