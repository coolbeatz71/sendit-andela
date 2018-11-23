'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var config = {};

// configure the test environment DB
/**
 * Credit to charles odili https://github.com/chalu/pre-bc-workshops/
 */
if (process.env.NODE_ENV === 'test') {
  config = {
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.TEST_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  };
}

// configure the dev/prod environment DB
if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'prod') {
  config = {
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DEV_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  };
}

var pool = new _pg.Pool(config);

var connect = async function connect() {
  return pool.connect();
};

/**
 * Execute a SQL query
 * @param  string query
 * @param  array  data
 * @return Promise
 */
var execute = async function execute(query) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var connection = await connect();
  try {
    return await connection.query(query, data);
  } catch (error) {
    console.log(error.message);
  } finally {
    connection.release();
  }
};

exports.default = execute;