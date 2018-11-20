import crypto from 'crypto';
import path from 'path';
import App from './app';

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
   * @return object
   */
  createUser(firstName, lastName, email, password) {
    this.setUserId();
    const id = this.getUserId();
    let response;
    const userInfo = {
      id,
      firstName,
      lastName,
      email,
      password,
      token: this.getEncryptedToken(email),
    };

    const userData = this.app.readDataFile(userFilePath);

    const isUserExist = userData.find(item => item.email === email);

    if (!firstName || !lastName || !email || !password) {
      return null;
    }

    if (isUserExist) {
      response = false;
    } else {
      // push new user
      userData.push(userInfo);
      this.app.writeDataFile(userFilePath, userData);
      response = userInfo;
    }
    return response;
  }

  /**
   * get userInfo by email and password [signIn]
   *
   * @param  string email
   * @param  string password
   * @return object
   */
  getUser(email, password) {
    this.email = email;
    this.password = password;

    const userData = this.app.readDataFile(userFilePath);

    userData.forEach((item) => {
      if (item.email === this.email && item.password === this.password) {
        this.userInfo = item;
      }
    });

    return this.userInfo;
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

    if (!parcel || parcel.status === 'delivered') {
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
