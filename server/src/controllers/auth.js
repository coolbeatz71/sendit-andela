// importing models
import User from '../models/user';

export default class AuthCtrl {
  static userSignUp(request, response) {
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

    request.checkBody('firstName').notEmpty()
      .isAlpha().withMessage('Must only contains alphabetic symbols');
    request.checkBody('lastName').notEmpty()
      .isAlpha().withMessage('Must only contains alphabetic symbols');
    request.checkBody('email').notEmpty()
      .isEmail().withMessage('Invalid email format');
    request.checkBody('password').notEmpty()
      .isAlphanumeric().withMessage('Must contains alphabetic or numeric symbols');

    const errors = request.validationErrors();

    if (errors) {
      response.status(400).json({
        status: 'fail',
        message: errors,
      });
    }

    const user = new User();
    const signUp = user.createUser(firstName, lastName, email, password);

    if (!signUp) {
      response.status(409).json({
        status: 'fail',
        message: 'the entered email is already used by an account',
      });
    } else {
      response.status(201).json({
        status: 'success',
        user: signUp,
      });
    }
  }

  static userSignIn(request, response) {
    // get sign data from the request body
    const { email, password } = request.body;

    if (!email || !password) {
      response.status(400).json({
        status: 'fail',
        message: 'Email and password are required',
      });
    } else {
      const user = new User();
      const userInfo = user.getUser(email, password);

      if (userInfo) {
        response.status(200).json({
          status: 'success',
          user: userInfo,
        });
      } else {
        response.status(404).json({
          status: 'fail',
          message: 'User not found, Incorrect email or password',
        });
      }
    }
  }
}
