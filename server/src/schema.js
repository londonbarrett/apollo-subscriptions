const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    board(channel: String!): [Message!]!
  }

  type Mutation {
    post(channel: String, text: String): Message!
  }

  type Subscription {
    stream(channel: String!): Message!
  }

  type Channel {
    id: ID!
    name: String!
    messages: [Message!]!
  }

  type Message {
    id: ID!
    text: String!
    channel: Channel!
  }

`;
