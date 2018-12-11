// importing models
import Parcel from '../models/parcel';
import User from '../models/user';
import App from '../models/app';
import constants from '../models/constant';

export default class UserCtrl {
  /**
   * get All parcels for a user
   * @param  Request request
   * @param  Response response
   * @return object json
   */
  static async getAllParcels(request, response) {
    const { userId } = request.params;
    const { email } = response.locals;

    request.check('userId', 'The user id is required').notEmpty()
      .isInt()
      .withMessage('userId must be a number');

    const errors = request.validationErrors();

    if (errors) {
      response.status(400).json({
        status: 'fail',
        error: 'validation',
        message: errors,
      });
    } else {
      const app = new App();
      const parcel = new Parcel();

      // get the user id from the DB
      const user = await app.getIdByEmail(email, constants.USER);

      if (userId.toString() === user.id_user.toString()) {
        const getParcel = await parcel.getAllParcelByUser(userId);
        response.status(200).json({
          status: 'success',
          parcel: getParcel,
        });
      } else {
        response.status(401).json({
          status: 'fail',
          message: 'Not Authorized, can only view your own parcels',
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
    const userId = response.locals.id;
    const {
      pending,
      transit,
      delivered,
      cancelled,
    } = constants.DEFAULT_STATUS;

    const app = new App();
    const isUser = await app.isEmailExist(email, constants.USER);

    if (!isUser) {
      response.status(403).json({
        status: 'fail',
        auth: 'invalid',
        message: 'Forbidden, Invalid user authentication key',
      });
    }

    const user = new User();
    const all = await user.getParcelNumber(userId);
    const parcelPending = await user.getParcelNumber(userId, pending);
    const parcelInTransit = await user.getParcelNumber(userId, transit);
    const parcelDelivered = await user.getParcelNumber(userId, delivered);
    const parcelCancelled = await user.getParcelNumber(userId, cancelled);

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
