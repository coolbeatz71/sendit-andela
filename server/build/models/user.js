'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _constant = require('./constant');

var _constant2 = _interopRequireDefault(_constant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var userFilePath = _path2.default.resolve(__dirname, '../../assets/users.json');
var parcelFilePath = _path2.default.resolve(__dirname, '../../assets/parcels.json');

var User = function () {
  function User(firstName, lastName, email, password) {
    _classCallCheck(this, User);

    var app = new _app2.default();
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


  _createClass(User, [{
    key: 'createUser',
    value: async function createUser(firstName, lastName, email, password) {
      var response = void 0;
      var isEmailExist = await this.app.isEmailExist(email, _constant2.default.USER);

      // if the email exist
      if (isEmailExist) {
        return _constant2.default.EMAIL_EXIST;
      }

      // if the email dont exist, I can register the user
      if (!isEmailExist) {
        // generate the password hash
        var passwordHash = _bcrypt2.default.hashSync(password, 10);

        // insert the user to the database
        var query = 'INSERT INTO users (first_name, last_name, email, password) \n      VALUES ($1, $2, $3, $4) RETURNING id_user';

        var result = await (0, _db2.default)(query, [firstName, lastName, email, passwordHash]);

        var userId = result.rows[0].id_user;

        // generate the user token with jwt
        var userToken = _jsonwebtoken2.default.sign({
          id: userId,
          email: email
        }, process.env.JWT_SECRET_TOKEN);

        response = {
          id: userId,
          firstName: firstName,
          lastName: lastName,
          email: email,
          token: userToken
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

  }, {
    key: 'getUserIdByEmail',
    value: function getUserIdByEmail(email) {
      var _this = this;

      this.email = email;
      var myId = void 0;
      var userData = this.app.readDataFile(userFilePath);

      // use Array.find()
      userData.forEach(function (item) {
        if (item.email === _this.email) {
          myId = item.id;
        }
      });

      return myId;
    }

    /**
     * set the userId
     */

  }, {
    key: 'setUserId',
    value: function setUserId() {
      this.userId = String(Math.random()).substr(2, 3);
    }

    /**
     * get the userId
     * @return string
     */

  }, {
    key: 'getUserId',
    value: function getUserId() {
      return this.userId;
    }

    /**
     * check whether the token is valid or not
     *
     * @param  string  authKey
     * @return Boolean
     */

  }, {
    key: 'isTokenValid',
    value: function isTokenValid(authKey) {
      var userData = this.app.readDataFile(userFilePath);
      var user = userData.find(function (item) {
        return item.token === authKey;
      });

      return !!user;
    }

    /**
     * retrive the user Id using his authKey
     *
     * @param  string authKey
     * @return string
     */

  }, {
    key: 'getUserIdByToken',
    value: function getUserIdByToken(authKey) {
      var userData = this.app.readDataFile(userFilePath);
      var user = userData.find(function (item) {
        return item.token === authKey;
      });

      return user ? user.id : false;
    }

    /**
     * return an encrypted token for the user
     *
     * @param  string email
     * @return string
     */

  }, {
    key: 'getEncryptedToken',
    value: function getEncryptedToken(email) {
      if (!email) {
        return false;
      }
      var cipher = _crypto2.default.createCipher('aes192', email);

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

  }, {
    key: 'editParcelDestination',
    value: function editParcelDestination(userId, parcelId, destination) {
      // read parcel json file
      var parcelData = this.app.readDataFile(parcelFilePath);

      var parcel = parcelData.find(function (el) {
        return el.orderId === parcelId && el.sender.id === userId;
      });

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

  }, {
    key: 'cancelParcel',
    value: function cancelParcel(userId, parcelId) {
      // read parcel json file
      var parcelData = this.app.readDataFile(parcelFilePath);

      var parcel = parcelData.find(function (el) {
        return el.orderId === parcelId && el.sender.id === userId;
      });

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

  }, {
    key: 'getParcelNumber',
    value: function getParcelNumber(userId, status) {
      var parcelData = this.app.readDataFile(parcelFilePath);

      // if status is undefined, we should getAllParcel
      if (status) {
        var _parcel = parcelData.filter(function (el) {
          return el.sender.id === userId && el.status === status;
        });
        return _parcel.length;
      }
      var parcel = parcelData.filter(function (el) {
        return el.sender.id === userId;
      });
      return parcel.length;
    }
  }]);

  return User;
}();

exports.default = User;


var user = new User();
user.createUser('Kalenga', 'Glody', 'kalenga@gmail.com', '12345678').then(function (data) {
  console.log(data);
});