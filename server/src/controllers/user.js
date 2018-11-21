// importing models
import Parcel from '../models/parcel';
import User from '../models/user';

export default class UserCtrl {
  static getAllParcels(request, response) {
    const { userId } = request.params;

    const parcel = new Parcel();
    const getParcel = parcel.getAllParcelByUser(userId);

    response.status(200).json({
      status: 'success',
      parcel: getParcel,
    });
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
