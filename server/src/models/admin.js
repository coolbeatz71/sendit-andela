import path from 'path';
import App from './app';

const adminFilePath = path.resolve(__dirname, '../../assets/admin.json');
const parcelFilePath = path.resolve(__dirname, '../../assets/parcels.json');

export default class Admin {
  constructor(email, password) {
    const app = new App();
    this.app = app;

    this.email = email;
    this.password = password;
  }

  /**
   * get adminInfo by email and password [signIn]
   *
   * @param  string email
   * @param  string password
   * @return object
   */
  getAdmin(email, password) {
    this.email = email;
    this.password = password;

    const adminData = this.app.readDataFile(adminFilePath);

    adminData.forEach((item) => {
      if (item.email === this.email && item.password === this.password) {
        this.adminInfo = item;
      }
    });

    return this.adminInfo;
  }

  /**
   * get the admin Id using his email
   *
   * @param  string email
   * @return string
   */
  getAdminIdByEmail(email) {
    this.email = email;
    let myId;
    const adminData = this.app.readDataFile(adminFilePath);

    adminData.forEach((item) => {
      if (item.email === this.email) {
        myId = item.id;
      }
    });

    return myId;
  }

  /**
   * check whether the admin token is valid or not
   *
   * @param  string  authKey
   * @return boolean
   */
  isTokenValid(authKey) {
    const adminData = this.app.readDataFile(adminFilePath);
    const admin = adminData.find(item => item.token === authKey);

    return !!admin;
  }

  /**
   * get admin Id using the token (authKey)
   *
   * @param  string authKey
   * @return object || false
   */
  getAdminIdByToken(authKey) {
    const userData = this.app.readDataFile(adminFilePath);
    const user = userData.find(item => item.token === authKey);

    return user ? user.id : false;
  }

  /**
   * edit presentLocation or status for a delivery order
   * @param  string userId
   * @param  string parcelId
   * @param  object params
   * @return {[type]}
   */
  editParcel(parcelId, params = {}) {
    // get presentLocation and status
    const { presentLocation, status } = params;

    // read parcel json file
    const parcelData = this.app.readDataFile(parcelFilePath);

    const parcel = parcelData.find(el => el.orderId === parcelId);

    if (!parcel || !presentLocation || !status || parcel.status === 'delivered') {
      return false;
    }

    // edit its presentLocation or status
    parcel.presentLocation = presentLocation;
    parcel.status = status;

    this.app.writeDataFile(parcelFilePath, parcelData);
    return parcel;
  }

  /**
   * get Number of parcel delivery order by categories for all users
   * @param  string status
   * @return Number
   */
  getParcelNumber(status) {
    const parcelData = this.app.readDataFile(parcelFilePath);

    // if status is undefined, we should getAllParcel
    if (status) {
      const parcel = parcelData.filter(el => el.status === status);
      return parcel.length;
    }
    return parcelData.length;
  }
}
