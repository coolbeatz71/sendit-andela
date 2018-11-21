'use strict';

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Middleware for the user
 */
var checkAuth = function checkAuth(request, response, next) {
  if (!request.headers.authorization || request.headers.authorization.indexOf('Bearer ') === -1) {
    response.status(401).json({
      error: true,
      authKeyMissed: true
    });
  } else {
    // split the header value to get only teh authKey (Bearer wuyhdu3Y488478Eehjh...)
    var authKey = request.headers.authorization.split(' ')[1];

    // verify the authKey
    var user = new _user2.default();
    var isTokenValid = user.isTokenValid(authKey);

    if (!isTokenValid) {
      response.status(401).json({
        error: true,
        authKeyInvalid: true
      });
    } else {
      next();
    }
  }
}; // importing models


module.exports = checkAuth;