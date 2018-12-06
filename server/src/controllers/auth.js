// importing models
import User from '../models/user';
import constants from '../models/constant';

export default class AuthCtrl {
  /**
   * signUp the user
   * @param  string request
   * @param  string response
   * @return object json
   */
  static async userSignUp(request, response) {
    const {
      firstName,
      lastName,
      email,
      password,
    } = request.body;

    if (!firstName || !lastName || !email || !password) {
      response.status(400).json({
        status: 'fail',
        message: 'first name, last name, email and password are required',
      });
    }

    request.checkBody('firstName', 'first name is required').notEmpty()
      .isAlpha().trim()
      .withMessage('First name must only contains alphabetic symbols');
    request.checkBody('lastName', 'last name is required').notEmpty()
      .isAlpha().trim()
      .withMessage('Last name must only contains alphabetic symbols');
    request.checkBody('email', 'email is required').notEmpty()
      .trim()
      .isEmail()
      .withMessage('Invalid email format');
    request.checkBody('password', 'password is required').notEmpty()
      .isAlphanumeric().trim()
      .withMessage('The password must contains alphabetic or numeric symbols');

    const errors = request.validationErrors();

    if (errors) {
      response.status(400).json({
        status: 'fail',
        message: errors,
      });
    } else {
      const user = new User();
      const signUp = await user.createUser(firstName, lastName, email, password);

      if (signUp === constants.EMAIL_EXIST) {
        response.status(409).json({
          status: 'fail',
          message: 'The entered email is already used by an account',
        });
      } else {
        response.status(201).json({
          status: 'success',
          user: signUp,
        });
      }
    }
  }

  /**
   * signIn the user
   * @param  string request
   * @param  string response
   * @return object json
   */
  static async userSignIn(request, response) {
    // get sign data from the request body
    const { email, password } = request.body;

    if (!email || !password) {
      response.status(400).json({
        status: 'fail',
        message: 'Email and password are required',
      });
    }

    request.checkBody('email', 'email is required').notEmpty()
      .trim()
      .isEmail()
      .withMessage('Invalid email format');
    request.checkBody('password', 'password is required').notEmpty()
      .isAlphanumeric().trim()
      .withMessage('The password must contains alphabetic or numeric symbols');

    const errors = request.validationErrors();

    if (errors) {
      response.status(400).json({
        status: 'fail',
        message: errors,
      });
    } else {
      const user = new User();
      const login = await user.loginUser(email, password);

      if (login === constants.INVALID_EMAIL || login === constants.INVALID_PASSWORD) {
        response.status(404).json({
          status: 'fail',
          message: 'User not found, Incorrect email or password',
        });
      } else {
        response.status(200).json({
          status: 'success',
          user: login,
        });
      }
    }
  }
}
