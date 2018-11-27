import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import path from 'path';
import App from './app';
import constants from './constant';
import execute from './db';

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
   * login the admin to his account
   *
   * @param  string email
   * @param  string password
   * @return object | constant
   */
  async loginAdmin(email, password) {
    this.email = email;
    this.password = password;

    const isEmailExist = await this.app.isEmailExist(email, constants.ADMIN);

    // if the email doesnt exist
    if (!isEmailExist) {
      return constants.INVALID_EMAIL;
    }

    // get the admin password
    const query = 'SELECT password FROM admin WHERE email = $1';
    const result = await execute(query, [email]);

    const hashPassword = result.rows[0].password.trim();

    // compare hashed and plain password
    if (!bcrypt.compareSync(password, hashPassword)) {
      return constants.INVALID_PASSWORD;
    }

    // get the admin Id
    const id = await this.app.getIdByEmail(email, constants.ADMIN);
    const adminId = id.id_admin;

    // generate the user token with jwt
    const userToken = jwt.sign({
      id: adminId,
      email,
    }, process.env.JWT_SECRET_TOKEN);

    // return user data
    const data = await this.app.getInfoById(adminId, constants.ADMIN);

    return {
      id: adminId,
      firstName: data.first_name.trim(),
      lastName: data.last_name.trim(),
      email: data.email.trim(),
      token: userToken,
    };
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
