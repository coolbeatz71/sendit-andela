import path from 'path';
import App from './app';

const parcelFilePath = path.resolve(__dirname, '../../assets/parcels.json');

const defaultStatus = {
  delivered: 'delivered',
  transit: 'in transit',
  cancelled: 'cancelled',
};

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
  createParcel(senderId, parcelName, description, pickupLocation, destination, weight) {
    this.setOrderId();

    const presentLocation = '';
    const price = this.getParcelPrice(weight);
    const status = defaultStatus.transit;
    const orderId = this.getOrderId();

    const parcelInfo = {
      orderId,
      sender: {
        id: senderId,
      },
      parcelName,
      description,
      weight,
      price,
      status,
      pickupLocation,
      presentLocation,
      destination,
    };

    if (!senderId || !parcelName || !description || !pickupLocation || !destination || !weight) {
      return false;
    }
    const parcelData = this.app.readDataFile(parcelFilePath);

    // push new order
    parcelData.push(parcelInfo);
    this.app.writeDataFile(parcelFilePath, parcelData);
    return parcelInfo;
  }

  /**
   * get all parcel delivery order
   * @return array
   */
  getAllParcel() {
    const parcelData = this.app.readDataFile(parcelFilePath);
    return parcelData;
  }

  /**
   * get all parcel delivery order for a particular user
   *
   * @param  string id
   * @return array
   */
  getAllParcelByUser(id) {
    const parcelData = this.app.readDataFile(parcelFilePath);

    const parcel = parcelData.filter(el => el.sender.id === id);

    if (parcel.length < 1) {
      return null;
    }
    return parcel;
  }

  /**
   * get a single parcel order by orderId
   *
   * @param  string orderId
   * @return string
   */
  getParcelById(orderId) {
    const parcelData = this.app.readDataFile(parcelFilePath);

    const parcel = parcelData.filter(el => el.orderId === orderId);

    if (parcel.length < 1) {
      return null;
    }
    return parcel;
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

  /**
   * set the orderId
   */
  setOrderId() {
    this.orderId = String(Math.random()).substr(2, 3);
  }

  /**
   * get the orderId
   * @return string
   */
  getOrderId() {
    return this.orderId;
  }
}
