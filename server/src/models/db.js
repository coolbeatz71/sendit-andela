/**
 * Credit to charles odili https://github.com/chalu/pre-bc-workshops/
 */
import { Pool } from 'pg';

let config = {};

// configure the test environment DB
if(process.env.NODE_ENV === 'test'){
  config = {
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.TEST_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  };
}

// configure the dev/prod environment DB
if(process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'prod'){
  config = {
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DEV_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  };
}

const pool = new Pool(config);

const connect = async () => pool.connect();

/**
 * Execute a SQL query
 * @param  string query
 * @param  array  data
 * @return Promise
 */
const execute = async (query, data = []) => {
  const connection = await connect();
  try {
    return await connection.query(query, data);
  } catch (error) {
    console.log(error.message);
  } finally {
    connection.release();
  }
};

export default execute;
