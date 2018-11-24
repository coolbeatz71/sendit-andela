'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var secretToken = process.env.JWT_SECRET_TOKEN;

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
    _jsonwebtoken2.default.verify(authKey, secretToken, function (err, data) {
      // on error
      if (err) {
        response.status(401).json({
          status: 'fail',
          message: 'Not authorized'
        });
      }
      // on success
      if (data) {
        // get the decoded email and userId
        var userId = data.userId,
            email = data.email;


        request.auth.userId = userId;
        request.auth.email = email;

        next();
      }
    });
  }
};

module.exports = checkAuth;