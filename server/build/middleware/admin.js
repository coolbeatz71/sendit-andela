'use strict';

var _admin = require('../models/admin');

var _admin2 = _interopRequireDefault(_admin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Middleware for the admin
 */
var checkAuthAdmin = function checkAuthAdmin(request, response, next) {
  if (!request.headers.authorization || request.headers.authorization.indexOf('Bearer ') === -1) {
    response.status(401).json({
      error: true,
      authKeyMissed: true
    });
  } else {
    // split the header value to get only teh authKey (Bearer wuyhdu3Y488478Eehjh...)
    var authKey = request.headers.authorization.split(' ')[1];

    // verify the authKey
    var admin = new _admin2.default();
    var isTokenValid = admin.isTokenValid(authKey);

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


module.exports = checkAuthAdmin;