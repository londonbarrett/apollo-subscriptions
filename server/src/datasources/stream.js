import { DataSource } from 'apollo-datasource';
import { Pool } from 'pg';

class StreamAPI extends DataSource {
  constructor() {
    super();
    this.pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'postgres',
      password: 'postgres',
      port: 5432,
    });
    this.pool.connect();
  }
  async helloWorld() {
    const res = await this.pool.query('SELECT $1::text as message', ['Hello world!']);
    console.log(res.rows[0].message);
  }
  async post(channel, message) {
    // TODO
  }
}

export default StreamAPI;
