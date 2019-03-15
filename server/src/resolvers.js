const { withFilter } = require('apollo-server-express');
const { MESSAGE_ADDED } = require('./consts');

module.exports = {
  Query: {
    board: (_, { channel }, { dataSources: { streamAPI } }) =>
      streamAPI.getChannelMessages(channel)
  },
  Mutation: {
    post: (_, { channel, text }, { pubsub, dataSources: { streamAPI } }) =>
      streamAPI.post(channel, text),
  },
  Subscription: {
    stream: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator([MESSAGE_ADDED]),
        (payload, variables) => payload.channel.name === variables.channel,
      ),
      resolve: payload => payload,
    }
  },
  Channel: {
    messages: ({ name }, _, { dataSources: { streamAPI } }) =>
      streamAPI.getChannelMessages(name),
  },
  Message: {
    channel: ({ id }, _, { dataSources: { streamAPI } }) =>
      streamAPI.getMessageChannel(id),
  },
};
