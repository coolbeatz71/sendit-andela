'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _pg = require('pg');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var envPath = _path2.default.resolve(__dirname, '../../../.env');

_dotenv2.default.config({ path: envPath });

//set dev or test environment
var myEnv = process.env.NODE_ENV ? process.env.NODE_ENV.toUpperCase() + '_' : '';

var db_config = {
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env[myEnv + 'DATABASE'],
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
};

console.log(db_config);

/**
 * Credit to charles odili https://github.com/chalu/pre-bc-workshops/
 */
var pool = new _pg.Pool(db_config);

//create the DB connection 
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

execute('SELECT * FROM admin', []).then(function (result) {
  console.log(result.rows);
});

exports.default = execute;