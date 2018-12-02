import path from 'path';
import { Pool } from 'pg';
import dotenv from 'dotenv';

const envPath = path.resolve(__dirname, '../../../.env');

dotenv.config({ path: envPath });

// set dev or test environment
const myEnv = process.env.NODE_ENV ? `${process.env.NODE_ENV.toUpperCase()}_` : '';

const dbConfig = {
  user: process.env[`${myEnv}DB_USERNAME`],
  host: process.env[`${myEnv}DB_HOST`],
  database: process.env[`${myEnv}DATABASE`],
  password: process.env[`${myEnv}DB_PASSWORD`],
  port: process.env[`${myEnv}_DB_PORT`],
};


const pool = new Pool({
  connectionString: 'postgres://zqovliavkubvcd:396486bb17d5f53e5a0309f27adfacac3a430caa7f9f60f265001304547b419c@ec2-50-19-249-121.compute-1.amazonaws.com:5432/d2f450emadmm6q',
});

/**
 * Credit to charles odili https://github.com/chalu/pre-bc-workshops/
 */

// create the DB connection
const connect = async () => pool.connect();

// query to drop all tables
const dropTables = () => {
  const parcelsTable = 'DROP TABLE IF EXISTS parcels';
  const adminTable = 'DROP TABLE IF EXISTS admin';
  const usersTable = 'DROP TABLE IF EXISTS users';

  const dropTablesQueries = `${parcelsTable}; ${adminTable}; ${usersTable}`;

  pool.query(dropTablesQueries)
    .then((res) => {
      pool.end();
    })
    .catch((err) => {
      pool.end();
    });
  pool.on('remove', () => {
    process.exit(0);
  });
};

const createTables = () => {
  const usersTable = `CREATE TABLE IF NOT EXISTS
      users(
        id_user SERIAL PRIMARY KEY,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        password TEXT NOT NULL,
        email TEXT NOT NULL
      )`;

  const adminTable = `CREATE TABLE IF NOT EXISTS
      admin(
        id_admin SERIAL PRIMARY KEY,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        password TEXT NOT NULL,
        email TEXT NOT NULL
      )`;

  const parcelsTable = `CREATE TABLE IF NOT EXISTS
      parcels(
        id_parcel SERIAL PRIMARY KEY,
        id_user INTEGER,
        parcel_name TEXT NOT NULL,
        description TEXT NOT NULL,
        pickup_location TEXT NOT NULL,
        destination TEXT NOT NULL,
        present_location TEXT NULL,
        weight VARCHAR(10) NULL,
        price DECIMAL(12,3) NOT NULL,
        status VARCHAR(20) NULL,
        FOREIGN KEY (id_user) REFERENCES users (id_user)
      )`;

  const createTablesQueries = `${usersTable}; ${adminTable}; ${parcelsTable}`;

  pool.query(createTablesQueries)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
  pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
  });
};

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

export {
  dropTables, createTables, pool, execute,
};

require('make-runnable');
