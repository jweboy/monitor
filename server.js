const express = require('express');
// const http = require('http');
const fs = require('fs');
const path = require('path');
const graphHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const logger = require('./module/logger');
// const searchDirectory = require('./module/search-directory');

// const schema = buildSchema(`
//   type Query {
//     hello: String
//     id: ID!
//   }
// `);

const root = {
  hello: () => [1, 2, 3].join(','),
  name: 'jweboy',
  user: {
    id: 1,
    name: 'bingo',
  },
  scripts: ['a', 'b'],
};

const app = express();

app.use(
  '/graphql',
  graphHTTP({
    schema: buildSchema(fs.readFileSync(path.join(__dirname, 'schema/package.graphql'), 'utf-8')),
    rootValue: root,
    graphiql: true,
  })
);

const port = process.env.SERVER_PORT;

app.listen(port, () => {
  logger(`Server is run on ${port}.`);
});

process.on('uncaughtException', (err) => {
  console.log('UncaughtException err', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.log('UnhandledRejection err', err);
  process.exit(1);
});
