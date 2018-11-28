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
   * edit the status of parcel by the admin
   *
   * @param  string adminId
   * @param  string parcelId
   * @param  string  status
   * @return boolean || array
   */
  async editParcelStatus(parcelId, newStatus) {
    this.parcelId = parcelId;
    this.newStatus = newStatus;

    const query = 'SELECT status FROM parcels WHERE id_parcel = $1';

    const parcel = await execute(query, [
      parcelId,
    ]);

    if (parcel.rows.length <= 0) {
      return null;
    }

    const status = parcel.rows[0].status.trim();
    console.log(status);

    // dont edit status if already cancelled
    if (status === constants.DEFAULT_STATUS.cancelled) {
      return false;
    }

    const queryStatus = `UPDATE parcels SET status = $1 
    WHERE id_parcel = $2 RETURNING *`;

    const edit = await execute(queryStatus, [
      newStatus.trim(),
      parcelId,
    ]);

    return edit.rows[0];
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
