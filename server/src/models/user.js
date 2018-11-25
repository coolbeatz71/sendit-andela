import crypto from 'crypto';
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
    let response;
    const isEmailExist = await this.app.isEmailExist(email, constants.USER);

    // if the email exist
    if (isEmailExist) {
      return constants.EMAIL_EXIST;
    }

    // if the email dont exist, I can register the user
    if (!isEmailExist) {
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

      response = {
        id: userId,
        firstName,
        lastName,
        email,
        token: userToken,
      };
    }

    return response;
  }

  /**
   * get userId by his email
   *
   * @param  string email
   * @return string
   */
  getUserIdByEmail(email) {
    this.email = email;
    let myId;
    const userData = this.app.readDataFile(userFilePath);

    // use Array.find()
    userData.forEach((item) => {
      if (item.email === this.email) {
        myId = item.id;
      }
    });

    return myId;
  }

  /**
   * set the userId
   */
  setUserId() {
    this.userId = String(Math.random()).substr(2, 3);
  }

  /**
   * get the userId
   * @return string
   */
  getUserId() {
    return this.userId;
  }

  /**
   * check whether the token is valid or not
   *
   * @param  string  authKey
   * @return Boolean
   */
  isTokenValid(authKey) {
    const userData = this.app.readDataFile(userFilePath);
    const user = userData.find(item => item.token === authKey);

    return !!user;
  }

  /**
   * retrive the user Id using his authKey
   *
   * @param  string authKey
   * @return string
   */
  getUserIdByToken(authKey) {
    const userData = this.app.readDataFile(userFilePath);
    const user = userData.find(item => item.token === authKey);

    return user ? user.id : false;
  }

  /**
   * return an encrypted token for the user
   *
   * @param  string email
   * @return string
   */
  getEncryptedToken(email) {
    if (!email) {
      return false;
    }
    const cipher = crypto.createCipher('aes192', email);

    this.encrypted = cipher.update('some clear text data', 'utf8', 'hex');
    this.encrypted += cipher.final('hex');

    return this.encrypted;
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

const user = new User();
user.createUser('Kalenga', 'Glody', 'kalenga@gmail.com', '12345678').then((data) => {
  console.log(data);
});
