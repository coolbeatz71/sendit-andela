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
      response.status(404).json({
        status: 'fail',
        message: 'first name, last name, email and password are required',
      });
    } else {
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
  }
}
