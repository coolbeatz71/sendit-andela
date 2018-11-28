// importing models
import Admin from '../models/admin';
import constants from '../models/constant';
import Parcel from '../models/parcel';
import App from '../models/app';

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
    const { email } = response.locals;
    const app = new App();
    const isAdmin = await app.isEmailExist(email, constants.ADMIN);

    if (!isAdmin) {
      response.status(403).json({
        status: 'fail',
        message: 'Forbidden, Invalid admin authentication key',
      });
    } else {
      const parcel = new Parcel();
      const getParcel = await parcel.getAllParcel();

      response.status(200).json({
        status: 'success',
        parcel: getParcel,
      });
    }
  }

  /**
   * edit status of a particular parcel order
   * @param  Request request
   * @param  Response response
   * @return object json
   */
  static async editStatus(request, response) {
    const { parcelId } = request.params;
    const { status } = request.body;
    const { email } = response.locals;

    const app = new App();
    const isAdmin = await app.isEmailExist(email, constants.ADMIN);

    if (!isAdmin) {
      response.status(403).json({
        status: 'fail',
        message: 'Forbidden, Invalid admin authentication key',
      });
    }

    request.check('parcelId', 'parcel id is required')
      .notEmpty().isInt().withMessage('parcel id must be a number');

    request.checkBody('status', 'new status is required')
      .notEmpty().isAlpha().withMessage('new status must only contains alphabetic sysmbols');

    const errors = request.validationErrors();

    if (errors) {
      response.status(400).json({
        status: 'fail',
        message: errors,
      });
    } else {
      const admin = new Admin();
      const edit = await admin.editParcelStatus(parcelId, status);

      if (edit === undefined) {
        response.status(401).json({
          status: 'fail',
          message: 'Not authorized to cancel parcel delievry order',
        });
      } else if (edit === null) {
        response.status(404).json({
          status: 'fail',
          message: 'No parcel order found with this id',
        });
      } else if (!edit) {
        response.status(401).json({
          status: 'fail',
          message: 'Not authorized to edit status of this parcel order',
        });
      } else {
        response.status(200).json({
          status: 'success',
          parcel: edit,
        });
      }
    }
  }
}
