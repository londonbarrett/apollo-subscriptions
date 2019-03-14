import { withFilter } from 'apollo-server-express';

const MESSAGE_ADDED = 'MESSAGE_ADDED';

const messages = [];

const getChannelMessages = channel => messages.filter(
  message => message.channel === channel
);

export default {
  Query: {
    board: (_, { channel }) => getChannelMessages(channel)
  },
  Mutation: {
    post: (_, { channel, text }, { pubsub, dataSources: { streamAPI } }) => {
      streamAPI.helloWorld();
      const message = { channel, text };
      messages.push(message);
      pubsub.publish(MESSAGE_ADDED, { channel, text });
      return message;
    },
  },
  Subscription: {
    stream: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator([MESSAGE_ADDED]),
        (payload, variables) =>  payload.channel === variables.channel,
      ),
      resolve: payload => payload,
    }
  }
};
