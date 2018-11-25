'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressValidator = require('express-validator');

var _expressValidator2 = _interopRequireDefault(_expressValidator);

var _user = require('./routes/user');

var _user2 = _interopRequireDefault(_user);

var _parcel = require('./routes/parcel');

var _parcel2 = _interopRequireDefault(_parcel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var apiVersion = '/api/v1';

// use morgan for log
app.use((0, _morgan2.default)('dev'));

// use the bodyParser
app.use(_bodyParser2.default.urlencoded({
  extended: false
}));
app.use(_bodyParser2.default.json());

// handling CORS error
app.use(function (request, response, next) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (request.method === 'OPTIONS') {
    response.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    response.status(200).json({});
  }
  next();
});

// use the express validator middleware
app.use((0, _expressValidator2.default)({
  errorFormatter: function errorFormatter(param, msg, value) {
    var namespace = param.split('.');
    var root = namespace.shift();
    var formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }

    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

// user endpoint
app.use(apiVersion + '/users', _user2.default);
app.use(apiVersion + '/parcels', _parcel2.default);

// handling request error
app.use(function (request, response, next) {
  var error = new Error('Resource not found, invalid route');
  error.status = 404;
  next(error);
});

// customize error display
app.use(function (error, request, response, next) {
  response.status(error.status || 500);
  response.json({
    error: {
      message: error.message
    }
  });
  next();
});

module.exports = app;