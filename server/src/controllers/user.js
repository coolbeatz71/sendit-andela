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

    request.check('userId', 'the user id is required').notEmpty()
      .isInt()
      .withMessage('userId must be a number');

    const errors = request.validationErrors();

    if (errors) {
      response.status(400).json({
        status: 'fail',
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

  static countParcels(request, response) {
    // split the header value to get only teh authKey (Bearer wuyhdu3Y488478Eehjh...)
    const authKey = request.headers.authorization.split(' ')[1];

    const delivered = 'delivered';
    const inTransit = 'in transit';
    const cancelled = 'cancelled';
    // verify the authKey
    const user = new User();
    const userId = user.getUserIdByToken(authKey);

    const all = user.getParcelNumber(userId);
    const parcelDelivered = user.getParcelNumber(userId, delivered);
    const parcelInTransit = user.getParcelNumber(userId, inTransit);
    const parcelCancelled = user.getParcelNumber(userId, cancelled);

    response.status(200).json({
      status: 'success',
      parcel: {
        all,
        delivered: parcelDelivered,
        inTransit: parcelInTransit,
        cancelled: parcelCancelled,
      },
    });
  }
}
