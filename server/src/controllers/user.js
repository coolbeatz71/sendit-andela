// importing models
import Parcel from '../models/parcel';

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
}
