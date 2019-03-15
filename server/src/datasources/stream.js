const { DataSource } = require('apollo-datasource');
const { Pool } = require('pg');
const { MESSAGE_ADDED } = require('../consts');

class StreamAPI extends DataSource {
  async initialize(config) {
    this.context = config.context;
    this.pool = new Pool({
        user: 'postgres',
        host: 'postgres',
        database: 'postgres',
        password: 'postgres',
        port: 5432,
    });
    await this.pool.connect();
  }
  async post(channel, message) {
    const { pubsub } = this.context;
    let channelId = await this.selectChannel(channel);
    if (!channelId) {
      channelId = await this.createChannel(channel);
    }
    const messageId = await this.createMessage(message);
    await this.createRelation(channelId, messageId);
    pubsub.publish(MESSAGE_ADDED, {
      id: messageId,
      text: message,
      channel: {
        id: channelId,
        name: channel,
      },
    });
    return {
      id: messageId,
      text: message,
    };
  }
  async getMessageChannel(messageId) {
    const query = `
      SELECT channel.id, name FROM channel
        INNER JOIN message ON message.id=$1
    `;
    const res = await this.pool.query(query, [messageId]);
    return res.rows[0];
  }
  async getChannelMessages(channel) {
    const query = `
      SELECT message.id, message.text FROM message
        INNER JOIN message_channel ON message.id=message_channel.message
        INNER JOIN channel ON channel.id=message_channel.channel
        WHERE channel.name=$1
    `;
    const res = await this.pool.query(query, [channel]);
    return res.rows;
  }
  async selectChannel(channel) {
    const query = `
      SELECT id FROM channel
      WHERE name=$1
    `;
    const res = await this.pool.query(query, [ channel ]);
    return res.rows[0] && res.rows[0].id;
  }
  async createChannel(name) {
    const query = `
      INSERT INTO channel (name)
      VALUES ($1) RETURNING id
    `;
    const res = await this.pool.query(query, [ name ]);
    return res.rows[0] && res.rows[0].id;
  }
  async createMessage(text) {
    const query = `
      INSERT INTO message (text)
      VALUES ($1) RETURNING id
    `;
    const res = await this.pool.query(query, [ text ]);
    return res.rows[0] && res.rows[0].id;
  }
  async createRelation(channelId, messageId) {
    const query = `
      INSERT INTO message_channel (channel, message)
      VALUES ($1, $2)
    `;
    const res = await this.pool.query(query, [channelId, messageId]);
  }
}

module.exports = StreamAPI;
