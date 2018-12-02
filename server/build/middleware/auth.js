'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _constant = require('../models/constant');

var _constant2 = _interopRequireDefault(_constant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var secretToken = _constant2.default.JWT_SECRET_TOKEN;

/**
 * Middleware for the user and admin
 */
var checkAuth = function checkAuth(request, response, next) {
  if (!request.headers.authorization || request.headers.authorization.indexOf('Bearer ') === -1) {
    response.status(403).json({
      status: 'fail',
      message: 'Not authorized, authentication key is required'
    });
  } else {
    // split the header value to get only teh authKey (Bearer wuyhdu3Y488478Eehjh...)
    var authKey = request.headers.authorization.split(' ')[1];

    // verify the authKey
    _jsonwebtoken2.default.verify(authKey, secretToken, function (err, data) {
      // on error
      if (err) {
        response.status(401).json({
          status: 'fail',
          message: 'Not authorized, invalid authentication key'
        });
      }
      // on success
      if (data) {
        // get the decoded email and userId
        var id = data.id,
            email = data.email;

        response.locals.id = id;
        response.locals.email = email;

        next();
      }
    });
  }
};

exports.default = checkAuth;