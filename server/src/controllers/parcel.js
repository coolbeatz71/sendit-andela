// importing models
import Parcel from '../models/parcel';

export default class ParcelCtrl {
  static getAllParcels(request, response) {
    const parcel = new Parcel();
    const getParcel = parcel.getAllParcel();

    response.status(200).json({
      status: 'fail',
      parcel: getParcel,
    });
  }
}
