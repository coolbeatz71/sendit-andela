import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import App from './app';
import constants from './constant';
import { execute } from './db';

export default class Admin extends App {
  /**
   * login the admin to his account
   *
   * @param  string email
   * @param  string password
   * @return object | constant
   */
  async loginAdmin(email, password) {
    const loginData = [];
    this.email = email;
    this.password = password;

    loginData.push(this.email);

    const isEmailExist = await this.isEmailExist(this.email, constants.ADMIN);

    // if the email doesnt exist
    if (!isEmailExist) {
      return constants.INVALID_EMAIL;
    }

    // get the admin password
    const query = 'SELECT password FROM admin WHERE email = $1';
    const result = await execute(query, loginData);

    const hashPassword = result.rows[0].password.trim();

    // compare hashed and plain password
    if (!bcrypt.compareSync(this.password, hashPassword)) {
      return constants.INVALID_PASSWORD;
    }

    // get the admin Id
    const id = await this.getIdByEmail(this.email, constants.ADMIN);
    const adminId = id.id_admin;

    // generate the user token with jwt
    const userToken = jwt.sign({
      id: adminId,
      email,
    }, process.env.JWT_SECRET_TOKEN);

    // return user data
    const data = await this.getInfoById(adminId, constants.ADMIN);

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
   * @param  string parcelId
   * @param  string  status
   * @return boolean || array
   */
  async editParcelStatus(parcelId, newStatus) {
    const param = [];
    this.parcelId = parcelId;
    this.newStatus = newStatus;

    param.push(this.parcelId);

    const query = 'SELECT status FROM parcels WHERE id_parcel = $1';

    const parcel = await execute(query, param);

    if (!parcel.rows.length) {
      return constants.NO_ENTRY;
    }

    param.unshift(this.newStatus);

    const queryStatus = `UPDATE parcels SET status = $1 
    WHERE id_parcel = $2 RETURNING *`;

    const edit = await execute(queryStatus, param);

    return edit.rows[0];
  }

  /**
   * edit present location of parcel by the admin
   *
   * @param  string parcelId
   * @param  string  location
   * @return boolean || array
   */
  async editPresentLocation(parcelId, location) {
    const param = [];
    this.parcelId = parcelId;
    this.location = location;

    param.push(this.parcelId);

    const query = 'SELECT status FROM parcels WHERE id_parcel = $1';

    const parcel = await execute(query, param);

    if (!parcel.rows.length) {
      return constants.NO_ENTRY;
    }

    param.unshift(this.location);

    const queryLocation = `UPDATE parcels SET present_location = $1 
    WHERE id_parcel = $2 RETURNING *`;

    const edit = await execute(queryLocation, param);

    return edit.rows[0];
  }

  /**
   * get Number of parcel delivery order by categories for all users
   * @param  string status
   * @return Number
   */
  async getParcelNumber(status) {
    let query = '';
    let parcel;
    const param = [];
    this.status = status;
    param.push(this.status);

    if (!this.status) {
      query = 'SELECT id_parcel FROM parcels';
      parcel = await execute(query);
    } else {
      query = 'SELECT id_parcel FROM parcels WHERE status = $1';
      parcel = await execute(query, param);
    }

    return parcel.rows.length;
  }
}
