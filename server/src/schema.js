import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    board(channel: String!): [Message!]!
  }

  type Mutation {
    post(channel: String, text: String): Message!
  }

  type Subscription {
    stream(channel: String!): Message
  }

  type Message {
    channel: String!
    text: String!
  }
`;
