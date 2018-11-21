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

  static createParcel(request, response){
    // get sign data from the request body
    const {
      parcelName, description, pickupLocation, destination, weight,
    } = request.body;

    // We should get the userId using the authKey in the header
    const authKey = request.headers.authorization.split(' ')[1];

    const user = new User();
    const userId = user.getUserIdByToken(authKey);

    if (!parcelName || !description || !pickupLocation || !destination || !weight) {
      response.status(404).json({
        status: 'fail',
        message: 'Fill all required fields',
      });
    } else {
      const parcel = new Parcel();
      const createParcel = parcel.createParcel(
        userId, parcelName, description, pickupLocation, destination, weight,
        );
      response.status(201).json({
        status: 'success',
        parcel: createParcel,
      });
    }
  } 
}
