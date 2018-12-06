import jwt from 'jsonwebtoken';
import constants from '../models/constant';

const secretToken = constants.JWT_SECRET_TOKEN;

/**
 * Middleware for the user and admin
 */
const checkAuth = (request, response, next) => {
  if (!request.headers.authorization || request.headers.authorization.indexOf('Bearer ') === -1) {
    response.status(403).json({
      status: 'fail',
      auth: 'missing',
      message: 'Not authorized, authentication key is required',
    });
  } else {
    // split the header value to get only teh authKey (Bearer wuyhdu3Y488478Eehjh...)
    const authKey = request.headers.authorization.split(' ')[1];

    // verify the authKey
    jwt.verify(authKey, secretToken, (err, data) => {
      // on error
      if (err) {
        response.status(401).json({
          status: 'fail',
          auth: 'invalid',
          message: 'Not authorized, invalid authentication key',
        });
      }
      // on success
      if (data) {
        // get the decoded email and userId
        const { id, email } = data;
        response.locals.id = id;
        response.locals.email = email;

        next();
      }
    });
  }
};

export default checkAuth;
