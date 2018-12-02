'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.execute = exports.pool = exports.createTables = exports.dropTables = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _pg = require('pg');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var envPath = _path2.default.resolve(__dirname, '../../../.env');

_dotenv2.default.config({ path: envPath });

// set dev or test environment
var myEnv = process.env.NODE_ENV ? process.env.NODE_ENV.toUpperCase() + '_' : '';

var dbConfig = {
  user: process.env[myEnv + '_DB_USERNAME'],
  host: process.env[myEnv + '_DB_HOST'],
  database: process.env[myEnv + '_DATABASE'],
  password: process.env[myEnv + '_DB_PASSWORD'],
  port: process.env[myEnv + '_DB_PORT']
};

/**
 * Credit to charles odili https://github.com/chalu/pre-bc-workshops/
 */
var pool = new _pg.Pool(dbConfig);

// create the DB connection
var connect = async function connect() {
  return pool.connect();
};

// query to drop all tables
var dropTables = function dropTables() {
  var parcelsTable = 'DROP TABLE IF EXISTS parcels';
  var adminTable = 'DROP TABLE IF EXISTS admin';
  var usersTable = 'DROP TABLE IF EXISTS users';

  var dropTablesQueries = parcelsTable + '; ' + adminTable + '; ' + usersTable;

  pool.query(dropTablesQueries).then(function (res) {
    pool.end();
  }).catch(function (err) {
    pool.end();
  });
  pool.on('remove', function () {
    process.exit(0);
  });
};

var createTables = function createTables() {
  var usersTable = 'CREATE TABLE IF NOT EXISTS\n      users(\n        id_user SERIAL PRIMARY KEY,\n        first_name TEXT NOT NULL,\n        last_name TEXT NOT NULL,\n        password TEXT NOT NULL,\n        email TEXT NOT NULL\n      )';

  var adminTable = 'CREATE TABLE IF NOT EXISTS\n      admin(\n        id_admin SERIAL PRIMARY KEY,\n        first_name TEXT NOT NULL,\n        last_name TEXT NOT NULL,\n        password TEXT NOT NULL,\n        email TEXT NOT NULL\n      )';

  var parcelsTable = 'CREATE TABLE IF NOT EXISTS\n      parcels(\n        id_parcel SERIAL PRIMARY KEY,\n        id_user INTEGER,\n        parcel_name TEXT NOT NULL,\n        description TEXT NOT NULL,\n        pickup_location TEXT NOT NULL,\n        destination TEXT NOT NULL,\n        present_location TEXT NULL,\n        weight VARCHAR(10) NULL,\n        price DECIMAL(12,3) NOT NULL,\n        status VARCHAR(20) NULL,\n        FOREIGN KEY (id_user) REFERENCES users (id_user)\n      )';

  var createTablesQueries = usersTable + '; ' + adminTable + '; ' + parcelsTable;

  pool.query(createTablesQueries).then(function (res) {
    console.log(res);
    pool.end();
  }).catch(function (err) {
    console.log(err);
    pool.end();
  });
  pool.on('remove', function () {
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

exports.dropTables = dropTables;
exports.createTables = createTables;
exports.pool = pool;
exports.execute = execute;


require('make-runnable');