const { ApolloServer, PubSub } = require('apollo-server-express');
const { createServer } = require('http');
const express = require('express');
const StreamAPI = require('./datasources/stream');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const PORT = 4000;
const app = express();

const dataSources = () => ({
  streamAPI: new StreamAPI()
})

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
