import path from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import execute from './db';

import App from './app';
import constants from './constant';

const userFilePath = path.resolve(__dirname, '../../assets/users.json');
const parcelFilePath = path.resolve(__dirname, '../../assets/parcels.json');

export default class User {
  constructor(firstName, lastName, email, password) {
    const app = new App();
    this.app = app;

    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }

  /**
   * create a user in the server [signUp]
   *
   * @param  string firstName
   * @param  string lastName
   * @param  string email
   * @param  string password
   * @return object | constant
   */
  async createUser(firstName, lastName, email, password) {
    const isEmailExist = await this.app.isEmailExist(email, constants.USER);

    // if the email exist
    if (isEmailExist) {
      return constants.EMAIL_EXIST;
    }

    // generate the password hash
    const passwordHash = bcrypt.hashSync(password, 10);

    // insert the user to the database
    const query = `INSERT INTO users (first_name, last_name, email, password) 
    VALUES ($1, $2, $3, $4) RETURNING id_user`;

    const result = await execute(query, [
      firstName, lastName, email, passwordHash,
    ]);

    const userId = result.rows[0].id_user;

    // generate the user token with jwt
    const userToken = jwt.sign({
      id: userId,
      email,
    }, process.env.JWT_SECRET_TOKEN);

    return {
      id: userId,
      firstName,
      lastName,
      email,
      token: userToken,
    };
  }

  /**
   * login the user to his account
   *
   * @param  string email
   * @param  string password
   * @return object | constant
   */
  async loginUser(email, password) {
    this.email = email;
    this.password = password;

    const isEmailExist = await this.app.isEmailExist(email, constants.USER);

    // if the email doesnt exist
    if (!isEmailExist) {
      return constants.INVALID_EMAIL;
    }

    // get the user password
    const query = 'SELECT password FROM users WHERE email = $1';
    const result = await execute(query, [email]);

    const hashPassword = result.rows[0].password.trim();

    // compare hashed and plain password
    if (!bcrypt.compareSync(password, hashPassword)) {
      return constants.INVALID_PASSWORD;
    }

    // get the user Id
    const id = await this.app.getIdByEmail(email, constants.USER);
    const userId = id.id_user;

    // generate the user token with jwt
    const userToken = jwt.sign({
      id: userId,
      email,
    }, process.env.JWT_SECRET_TOKEN);

    // return user data
    const data = await this.app.getInfoById(userId, constants.USER);

    return {
      id: userId,
      firstName: data.first_name.trim(),
      lastName: data.last_name.trim(),
      email: data.email.trim(),
      token: userToken,
    };
  }

  /**
   * edit the destination of parcel by a user
   *
   * @param  string userId
   * @param  string parcelId
   * @param  string  destination
   * @return boolean || array
   */
  editParcelDestination(userId, parcelId, destination) {
    // read parcel json file
    const parcelData = this.app.readDataFile(parcelFilePath);

    const parcel = parcelData.find(el => el.orderId === parcelId && el.sender.id === userId);

    if (!userId || !parcelId || !destination) {
      return null;
    }

    if (!parcel || parcel.status === 'delivered') {
      return false;
    }

    // edit its destination
    parcel.destination = destination;

    this.app.writeDataFile(parcelFilePath, parcelData);
    return parcel;
  }

  /**
   * Cancel a specific parcel delivery order
   *
   * @param  string userId
   * @param  string parcelId
   * @return boolean || array
   */
  cancelParcel(userId, parcelId) {
    // read parcel json file
    const parcelData = this.app.readDataFile(parcelFilePath);

    const parcel = parcelData.find(el => el.orderId === parcelId && el.sender.id === userId);

    if (!userId || !parcelId) {
      return null;
    }

    if (!parcel) {
      return undefined;
    }

    if (parcel.status === 'delivered') {
      return false;
    }

    // edit its status instead of removing it from the array
    parcel.status = 'cancelled';

    this.app.writeDataFile(parcelFilePath, parcelData);
    return parcel;
  }

  /**
   * get Number of parcel delivery order by categories for one users
   * @param  string userId
   * @param  string status
   * @return Number
   */
  getParcelNumber(userId, status) {
    const parcelData = this.app.readDataFile(parcelFilePath);

    // if status is undefined, we should getAllParcel
    if (status) {
      const parcel = parcelData.filter(el => el.sender.id === userId && el.status === status);
      return parcel.length;
    }
    const parcel = parcelData.filter(el => el.sender.id === userId);
    return parcel.length;
  }
}
