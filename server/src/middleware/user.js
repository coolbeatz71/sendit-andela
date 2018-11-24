import jwt from 'jsonwebtoken';

const secretToken = process.env.JWT_SECRET_TOKEN;

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
    jwt.verify(authKey, secretToken, (err, data) => {
      // on error
      if (err) {
        response.status(401).json({
          status: 'fail',
          message: 'Not authorized',
        });
      }
      // on success
      if (data) {
        // get the decoded email and userId
        const { userId, email } = data;

        request.auth.userId = userId;
        request.auth.email = email;

        next();
      }
    });
  }
};

module.exports = checkAuth;
