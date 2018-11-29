import App from './app';
import execute from './db';
import constants from './constant';


export default class Parcel {
  constructor() {
    const app = new App();
    this.app = app;
  }

  /**
   * create a parcel delivery order
   * @param  string senderId
   * @param  string parcelName
   * @param  string description
   * @param  string pickupLocation
   * @param  string destination
   * @param  int weight
   * @return object
   */
  async createParcel(senderId, parcelName, description, pickupLocation, destination, weight) {
    const presentLocation = '';
    const price = this.getParcelPrice(weight);
    const status = constants.DEFAULT_STATUS.pending;

    if (!senderId || !parcelName || !description || !pickupLocation || !destination || !weight) {
      return false;
    }

    const query = `INSERT INTO parcels 
    (id_user, parcel_name, description, pickup_location,
     present_location, destination, weight, price, status) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;

    const insert = await execute(query, [
      senderId, parcelName.trim(), description.trim(), pickupLocation.trim(),
      presentLocation.trim(), destination.trim(), weight, price, status.trim(),
    ]);
    const parcelInfo = insert.rows;

    return parcelInfo;
  }

  /**
   * get all parcel delivery order
   * @return array
   */
  async getAllParcel() {
    // select all parcel info to the database
    const query = 'SELECT * FROM parcels';
    const result = await execute(query);

    return result.rows;
  }

  /**
   * get all parcel delivery order for a particular user
   *
   * @param  string id
   * @return array
   */
  async getAllParcelByUser(id) {
    this.id = id;

    // select all parcel info to the database
    const query = 'SELECT * FROM parcels WHERE id_user = $1';
    const result = await execute(query, [
      id,
    ]);

    return result.rows;
  }

  /**
   * get a single parcel order by orderId
   *
   * @param  string orderId
   * @return string
   */
  async getParcelById(orderId) {
    this.orderId = orderId;

    // select all parcel info to the database
    const query = 'SELECT * FROM parcels WHERE id_parcel = $1';
    const result = await execute(query, [
      orderId,
    ]);

    return result.rows;
  }

  /**
   * get the parcel price from its weight
   * @param float weight
   * @return int
   */
  getParcelPrice(weight) {
    const unitPrice = 500;
    this.price = weight * unitPrice;
    return Number.parseInt(this.price, 10);
  }
}
