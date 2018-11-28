// importing models
import Parcel from '../models/parcel';
import User from '../models/user';

export default class ParcelCtrl {
  /**
   * get All parcels for all users (for the admin)
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

  /**
   * create a new parcel delivery order
   * @param  Request request
   * @param  Response response
   * @return object json
   */
  static async createParcel(request, response) {
    // get parcel data from the request body
    const {
      parcelName, description, pickupLocation, destination, weight,
    } = request.body;

    const { id } = response.locals;

    request.checkBody('parcelName', 'parcel name is required').notEmpty();
    request.checkBody('description', 'description is required').notEmpty();
    request.checkBody('pickupLocation', 'pickupLocation is required').notEmpty();
    request.checkBody('destination', 'destination is required').notEmpty();
    request.checkBody('weight', 'parcel weight is required')
      .notEmpty().isNumeric().withMessage('parcel weight must be a number');

    const errors = request.validationErrors();

    if (!parcelName || !description || !pickupLocation || !destination || !weight) {
      response.status(404).json({
        status: 'fail',
        message: 'Fill all required fields',
      });
    }

    if (errors) {
      response.status(400).json({
        status: 'fail',
        message: errors,
      });
    } else {
      const parcel = new Parcel();
      const createParcel = await parcel.createParcel(
        id, parcelName, description, pickupLocation, destination, weight,
      );
      response.status(201).json({
        status: 'success',
        parcel: createParcel,
      });
    }
  }

  /**
   * return a specific parcel delivery order (ADMIN)
   * @param  Request request
   * @param  Response response
   * @return object json
   */
  static async getParcelById(request, response) {
    const { parcelId } = request.params;

    request.check('parcelId', 'parcel id is required')
      .notEmpty().isInt().withMessage('parcel id must be a number');

    const errors = request.validationErrors();

    if (errors) {
      response.status(400).json({
        status: 'fail',
        message: errors,
      });
    } else {
      const parcel = new Parcel();
      const getParcel = await parcel.getParcelById(parcelId);

      if (getParcel.length <= 0) {
        response.status(404).json({
          status: 'fail',
          message: 'No parcel found with this parcel Id',
        });
      } else {
        response.status(200).json({
          status: 'success',
          parcel: getParcel,
        });
      }
    }
  }

  /**
   * cancel a particular parcel order
   * @param  Request request
   * @param  Response response
   * @return object json
   */
  static async cancelParcel(request, response) {
    const { parcelId } = request.params;
    const { id } = response.locals;

    request.check('parcelId', 'parcel id is required')
      .notEmpty().isInt().withMessage('parcel id must be a number');

    const errors = request.validationErrors();

    if (errors) {
      response.status(400).json({
        status: 'fail',
        message: errors,
      });
    } else {
      const user = new User();
      const cancel = await user.cancelParcel(id, parcelId);

      if (cancel === null) {
        response.status(404).json({
          status: 'fail',
          message: 'No parcel order found with this id',
        });
      } else if (!cancel) {
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
}
