'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// creating a port or use the one from the environment process
var port = process.env.PORT || 8080;
// creating a server
var server = _http2.default.createServer(_app2.default);

server.listen(port);

module.exports = server;