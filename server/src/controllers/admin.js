// importing models
import Admin from '../models/admin';
import constants from '../models/constant';
import Parcel from '../models/parcel';

export default class AdminCtrl {
  /**
   * signIn the admin
   * @param  Request request
   * @param  Response response
   * @return object json
   */
  static async adminSignIn(request, response) {
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
      const admin = new Admin();
      const login = await admin.loginAdmin(email, password);

      if (login === constants.INVALID_EMAIL) {
        response.status(404).json({
          status: 'fail',
          message: 'User not found, Incorrect email address',
        });
      } else if (login === constants.INVALID_PASSWORD) {
        response.status(404).json({
          status: 'fail',
          message: 'the password is incorrect',
        });
      } else {
        response.status(200).json({
          status: 'success',
          user: login,
        });
      }
    }
  }

  /**
   * get All parcels for all users
   * @param  Request request
   * @param  Response response
   * @return object json
   */
  static async getAllParcels(request, response) {
    const parcel = new Parcel();
    const getParcel = await parcel.getAllParcel();

    response.status(200).json({
      status: 'success',
      parcel: getParcel,
    });
  }
}
