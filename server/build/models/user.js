'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

// const userFilePath = path.resolve(__dirname, '../../assets/users.json');
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
      var isEmailExist = await this.app.isEmailExist(email, _constant2.default.USER);

      // if the email exist
      if (isEmailExist) {
        return _constant2.default.EMAIL_EXIST;
      }

      // generate the password hash
      var passwordHash = _bcrypt2.default.hashSync(password, 10);

      // insert the user to the database
      var query = 'INSERT INTO users (first_name, last_name, email, password) \n    VALUES ($1, $2, $3, $4) RETURNING id_user';

      var result = await (0, _db2.default)(query, [firstName.trim(), lastName.trim(), email.trim(), passwordHash.trim()]);

      var userId = result.rows[0].id_user;

      // generate the user token with jwt
      var userToken = _jsonwebtoken2.default.sign({
        id: userId,
        email: email
      }, process.env.JWT_SECRET_TOKEN);

      return {
        id: userId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        token: userToken
      };
    }

    /**
     * login the user to his account
     *
     * @param  string email
     * @param  string password
     * @return object | constant
     */

  }, {
    key: 'loginUser',
    value: async function loginUser(email, password) {
      this.email = email;
      this.password = password;

      var isEmailExist = await this.app.isEmailExist(email, _constant2.default.USER);

      // if the email doesnt exist
      if (!isEmailExist) {
        return _constant2.default.INVALID_EMAIL;
      }

      // get the user password
      var query = 'SELECT password FROM users WHERE email = $1';
      var result = await (0, _db2.default)(query, [email]);

      var hashPassword = result.rows[0].password.trim();

      // compare hashed and plain password
      if (!_bcrypt2.default.compareSync(password, hashPassword)) {
        return _constant2.default.INVALID_PASSWORD;
      }

      // get the user Id
      var id = await this.app.getIdByEmail(email, _constant2.default.USER);
      var userId = id.id_user;

      // generate the user token with jwt
      var userToken = _jsonwebtoken2.default.sign({
        id: userId,
        email: email
      }, process.env.JWT_SECRET_TOKEN);

      // return user data
      var data = await this.app.getInfoById(userId, _constant2.default.USER);

      return {
        id: userId,
        firstName: data.first_name.trim(),
        lastName: data.last_name.trim(),
        email: data.email.trim(),
        token: userToken
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
    value: async function cancelParcel(userId, parcelId) {
      this.userId = userId;
      this.parcelId = parcelId;

      var query = 'SELECT status FROM parcels WHERE id_parcel = $1 AND id_user = $2';

      var parcel = await (0, _db2.default)(query, [parcelId, userId]);

      if (parcel.length <= 0) {
        return null;
      }

      var status = parcel.rows[0].status.trim();
      console.log(status);

      // dont cancel if already cancelled or delivered
      if (status === _constant2.default.DEFAULT_STATUS.delivered || status === _constant2.default.DEFAULT_STATUS.cancelled) {
        return false;
      }

      var queryCancel = 'UPDATE parcels SET status = $1 \n    WHERE id_parcel = $2 AND id_user = $3 RETURNING *';

      var cancel = await (0, _db2.default)(queryCancel, [_constant2.default.DEFAULT_STATUS.cancelled.trim(), parcelId, userId]);

      return cancel.rows[0];
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