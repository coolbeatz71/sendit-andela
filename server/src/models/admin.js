import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import App from './app';
import constants from './constant';
import execute from './db';

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
   * @param  string parcelId
   * @param  string  status
   * @return boolean || array
   */
  async editParcelStatus(parcelId, newStatus) {
    this.parcelId = parcelId;
    this.newStatus = newStatus;

    if (newStatus === constants.DEFAULT_STATUS.cancelled) {
      return undefined;
    }

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
   * edit present location of parcel by the admin
   *
   * @param  string parcelId
   * @param  string  location
   * @return boolean || array
   */
  async editPresentLocation(parcelId, location) {
    this.parcelId = parcelId;
    this.location = location;

    const query = 'SELECT status FROM parcels WHERE id_parcel = $1';

    const parcel = await execute(query, [
      parcelId,
    ]);

    if (parcel.rows.length <= 0) {
      return null;
    }

    const status = parcel.rows[0].status.trim();
    console.log(status);

    // dont edit present location if parcel already cancelled
    if (status === constants.DEFAULT_STATUS.cancelled) {
      return false;
    }

    const queryLocation = `UPDATE parcels SET present_location = $1 
    WHERE id_parcel = $2 RETURNING *`;

    const edit = await execute(queryLocation, [
      location.trim(),
      parcelId,
    ]);

    return edit.rows[0];
  }

  /**
   * get Number of parcel delivery order by categories for all users
   * @param  string status
   * @return Number
   */
  async getParcelNumber(status) {
    let query;
    let parcel;
    this.status = status;

    if (!status) {
      query = 'SELECT id_parcel FROM parcels';
      parcel = await execute(query);
    } else {
      query = 'SELECT id_parcel FROM parcels WHERE status = $1';
      parcel = await execute(query, [
        status,
      ]);
    }

    return parcel.rows.length;
  }
}
