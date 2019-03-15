# APOLLO SUBSCRIPTIONS

This is an exercise for implementing GraphQL subscriptions manually with
Apollo Server 2, Postgres and NodeJS. It is a basic message stream with
channels.

> Note: this is not production grade, it is intended to be a simple
> exercise

## Features

- Apollo Server 2.
- Subscriptions.
- Docker.
- Postgres.

## Requirements

- Docker compose.

## Instructions

- Clone the repository.
- Mount the containers `cd server && docker-composer up -d`
- Navigate to the GraphQL Playground http://localhost:4000
- The following GraphQL operations are available:

```GraphQL
# Gets all the messages for a channel
query Board {
  board(channel: "natgeo") {
    id
    text
  }
}

# Subscribes to a channel
subscription Stream {
  stream(channel: "natgeo") {
    text
  }
}

# Posts a message to a channel
mutation Post {
  post(channel: "natgeo", text: "hola!") {
    text
  }
}
```

- When you are finished, unmount the containers `docker-compose down`

## TODOs

- [X] Basic subscriptions server.
- [X] Postgres docker container.
- [X] Database initialization.
- [X] Implement API.
- [X] Update GraphQL Schema.
- [X] Dockerize App.
- [ ] Implement graphql-postgres-subscriptions.