const { merge } = require('lodash');
const { makeExecutableSchema } = require('apollo-server');
const { scriptTypeDefs, scriptResolvers } = require('./scripts');
const { directoryTypeDefs, directoryResolvers } = require('./directories');
const { streamTypeDefs, streamResolvers } = require('./stream');

const rootTypeDefs = `
  type Query
  type Mutation
  type Subscription
  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;

const schema = makeExecutableSchema({
  typeDefs: [rootTypeDefs, scriptTypeDefs, directoryTypeDefs, streamTypeDefs],
  resolvers: merge({}, scriptResolvers, directoryResolvers, streamResolvers),
});

module.exports = schema;
