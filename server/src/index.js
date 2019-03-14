import { ApolloServer, PubSub } from 'apollo-server-express';
import { createServer } from 'http';
import express from 'express';
import StreamAPI from './datasources/stream';
import typeDefs from './schema';
import resolvers from './resolvers';

const PORT = 4000;

const app = express();

const pubsub = new PubSub();

const dataSources = () => ({
  streamAPI: new StreamAPI()
});

const server = new ApolloServer({
  context: { pubsub: new PubSub() },
  dataSources,
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
});
