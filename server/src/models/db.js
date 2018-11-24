import path from 'path';
import { Pool } from 'pg';
import dotenv from 'dotenv';

const envPath = path.resolve(__dirname, '../../../.env');

dotenv.config({ path: envPath });

//set dev or test environment
const myEnv = process.env.NODE_ENV ? `${process.env.NODE_ENV.toUpperCase()}_`: '';

const db_config = {
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env[`${myEnv}DATABASE`],
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

console.log(db_config);

/**
 * Credit to charles odili https://github.com/chalu/pre-bc-workshops/
 */
const pool = new Pool(db_config);

//create the DB connection 
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

execute('SELECT * FROM admin', []).then((result) => {
  console.log(result.rows);
});

export default execute;