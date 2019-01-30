const express = require('express');
const graphHTTP = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');
const cors = require('cors');
const logger = require('./utils/logger');
const readGraphqlSchemaFiles = require('./module/read-graphql');
const resolvers = require('./graphql/resolvers');

const app = express();

async function start() {
  const typeDefs = await readGraphqlSchemaFiles();

  app.use(cors()).use(
    '/graphql',
    graphHTTP({
      schema: makeExecutableSchema({ typeDefs, resolvers }),
      graphiql: true,
    })
  );

  const server = app.listen(process.env.SERVER_PORT, () => {
    console.log(server.address());
    logger(`Server is run on ${server.address().port}.`);
  });
}

start();

process.on('uncaughtException', (err) => {
  console.log('UncaughtException err', err);
  logger(err.stack);

  setTimeout(() => {
    process.exit(1);
  }, 300);
});

process.on('unhandledRejection', (err) => {
  console.log('UnhandledRejection err', err);
  logger(err.stack);

  setTimeout(() => {
    process.exit(1);
  }, 300);
});
