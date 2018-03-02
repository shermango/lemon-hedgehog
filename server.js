import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import mongoose from 'mongoose';
import schema from './schema.js';

const server = express();
const port = 5000;

mongoose.connect('mongodb://localhost/graphqlTut');

const connection = mongoose.connection;

connection.once('open', () => console.log('successfully connected to mongodb'));

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

server.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

server.listen(port, () => {
  console.log(`server listening on ${port}`);
});