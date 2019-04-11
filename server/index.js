const http = require('http');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
// const cors = require('cors');
const schema = require('./schema');
const { log } = require('./utils/logger');

const PORT = 4000;
const app = express();
const server = new ApolloServer({ schema });

// app.use(cors());

server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  log(`🚀  Graphql server is ready at http://localhost:${PORT}${server.graphqlPath}`);
  log(`🚀  Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
});

// Catch errors
process.on('uncaughtException', (err) => {
  log('UncaughtException err', err);
  // logger(err.stack);

  setTimeout(() => {
    process.exit(1);
  }, 0);
});

process.on('unhandledRejection', (err) => {
  log('UnhandledRejection err', err);
  // logger(err.stack);
});
