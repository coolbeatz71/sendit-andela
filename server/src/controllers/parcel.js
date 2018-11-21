// importing models
import Parcel from '../models/parcel';
import User from '../models/user';

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

  static getParcelById(request, response){
    const { parcelId } = request.params;

    const parcel = new Parcel();
    const getParcel = parcel.getParcelById(parcelId);

    if(!getParcel){
      response.status(404).json({
        status: 'fail',
        message: 'No parcel found, wrong parcel Id',
      });
    }else{
      response.status(200).json({
        status: 'success',
        parcel: getParcel,
      });
    }
  }

  static cancelParcel(request, response) {
    const { parcelId } = request.params;

    const user = new User();
    
    //get the AuthKey from the header to help retrieving the userId 
    const authKey = request.headers.authorization.split(' ')[1];

    //get the userId
    const userId = user.getUserIdByToken(authKey);

    const cancel = user.cancelParcel(userId, parcelId);

    if(!cancel){
      response.status(401).json({
        status: 'fail',
        message: 'Not authorized to cancel this parcel order',
      });
    } else {
      response.status(200).json({
        status: 'success',
        parcel: cancel,
      });
    }
  } 
}
