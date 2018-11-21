// importing models
import User from '../models/user';

/**
 * Middleware for the user
 */
const checkAuth = (request, response, next) => {
  if (!request.headers.authorization || request.headers.authorization.indexOf('Bearer ') === -1) {
    response.status(401).json({
      error: true,
      authKeyMissed: true,
    });
  } else {
    // split the header value to get only teh authKey (Bearer wuyhdu3Y488478Eehjh...)
    const authKey = request.headers.authorization.split(' ')[1];

    // verify the authKey
    const user = new User();
    const isTokenValid = user.isTokenValid(authKey);

    if (!isTokenValid) {
      response.status(401).json({
        error: true,
        authKeyInvalid: true,
      });
    } else {
      next();
    }
  }
};

module.exports = checkAuth;
