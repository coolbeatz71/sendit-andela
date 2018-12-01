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

      if (edit === constants.NO_ENTRY) {
        response.status(404).json({
          status: 'fail',
          message: 'No parcel order found with this id',
        });
      } else {
        response.status(200).json({
          status: 'success',
          parcel: edit,
        });
      }
    }
  }

  /**
   * edit present location of a particular parcel order
   * @param  Request request
   * @param  Response response
   * @return object json
   */
  static async editPresentLocation(request, response) {
    const { parcelId } = request.params;
    const { presentLocation } = request.body;
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
      .notEmpty()
      .isInt()
      .withMessage('parcel id must be a number');

    request.checkBody('presentLocation', 'present location is required')
      .notEmpty()
      .isAlpha()
      .withMessage('present location must only contains alphabetic sysmbols');

    const errors = request.validationErrors();

    if (errors) {
      response.status(400).json({
        status: 'fail',
        message: errors,
      });
    } else {
      const admin = new Admin();
      const edit = await admin.editPresentLocation(parcelId, presentLocation);

      if (edit === constants.NO_ENTRY) {
        response.status(404).json({
          status: 'fail',
          message: 'No parcel order found with this id',
        });
      } else {
        response.status(200).json({
          status: 'success',
          parcel: edit,
        });
      }
    }
  }

  /**
   * count the number of parcels according to their status
   *
   * @param  Request request
   * @param  Response response
   * @return object json
   */
  static async countParcels(request, response) {
    const { email } = response.locals;
    const {
      pending,
      transit,
      delivered,
      cancelled,
    } = constants.DEFAULT_STATUS;

    const app = new App();
    const isAdmin = await app.isEmailExist(email, constants.ADMIN);

    if (!isAdmin) {
      response.status(403).json({
        status: 'fail',
        message: 'Forbidden, Invalid admin authentication key',
      });
    }

    const admin = new Admin();
    const all = await admin.getParcelNumber();
    const parcelPending = await admin.getParcelNumber(pending);
    const parcelInTransit = await admin.getParcelNumber(transit);
    const parcelDelivered = await admin.getParcelNumber(delivered);
    const parcelCancelled = await admin.getParcelNumber(cancelled);

    response.status(200).json({
      status: 'success',
      parcel: {
        all,
        pending: parcelPending,
        delivered: parcelDelivered,
        inTransit: parcelInTransit,
        cancelled: parcelCancelled,
      },
    });
  }
}
