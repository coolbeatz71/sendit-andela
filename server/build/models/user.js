'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _db = require('./db');

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _constant = require('./constant');

var _constant2 = _interopRequireDefault(_constant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var User = function (_App) {
  _inherits(User, _App);

  function User() {
    _classCallCheck(this, User);

    return _possibleConstructorReturn(this, (User.__proto__ || Object.getPrototypeOf(User)).apply(this, arguments));
  }

  _createClass(User, [{
    key: 'createUser',

    /**
     * create a user in the server [signUp]
     *
     * @param  string firstName
     * @param  string lastName
     * @param  string email
     * @param  string password
     * @return object | constant
     */
    value: async function createUser(firstName, lastName, email, password) {
      var isEmailExist = await this.isEmailExist(email, _constant2.default.USER);

      // if the email exist
      if (isEmailExist) {
        return _constant2.default.EMAIL_EXIST;
      }

      // generate the password hash
      var passwordHash = _bcrypt2.default.hashSync(password, 10);

      var params = [firstName.trim(), lastName.trim(), email.trim(), passwordHash.trim()];

      // insert the user to the database
      var query = 'INSERT INTO users (first_name, last_name, email, password) \n    VALUES ($1, $2, $3, $4) RETURNING id_user';

      var result = await (0, _db.execute)(query, params);
      var userId = result.rows[0].id_user;

      // generate the user token with jwt
      var userToken = _jsonwebtoken2.default.sign({
        id: userId,
        email: email
      }, _constant2.default.JWT_SECRET_TOKEN);

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

      var isEmailExist = await this.isEmailExist(email, _constant2.default.USER);

      // if the email doesnt exist
      if (!isEmailExist) {
        return _constant2.default.INVALID_EMAIL;
      }

      var param = [this.email];

      // get the user password
      var query = 'SELECT password FROM users WHERE email = $1';
      var result = await (0, _db.execute)(query, param);

      var hashPassword = result.rows[0].password.trim();

      // compare hashed and plain password
      if (!_bcrypt2.default.compareSync(password, hashPassword)) {
        return _constant2.default.INVALID_PASSWORD;
      }

      // get the user Id
      var id = await this.getIdByEmail(email, _constant2.default.USER);
      var userId = id.id_user;

      // generate the user token with jwt
      var userToken = _jsonwebtoken2.default.sign({
        id: userId,
        email: email
      }, _constant2.default.JWT_SECRET_TOKEN);

      // return user data
      var data = await this.getInfoById(userId, _constant2.default.USER);

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
    value: async function editParcelDestination(userId, parcelId, destination) {
      this.userId = userId;
      this.parcelId = parcelId;
      this.destination = destination;

      var param = [this.parcelId, this.userId];

      var query = 'SELECT status FROM parcels WHERE id_parcel = $1 AND id_user = $2';
      var parcel = await (0, _db.execute)(query, param);

      if (!parcel.rows.length) {
        return _constant2.default.NO_ENTRY;
      }

      var status = parcel.rows[0].status.trim();

      // dont edit destination if already cancelled or delivered or in transit
      if (status !== _constant2.default.DEFAULT_STATUS.pending) {
        return false;
      }

      param.unshift(this.destination);

      var queryDestination = 'UPDATE parcels SET destination = $1 \n    WHERE id_parcel = $2 AND id_user = $3 RETURNING *';

      var edit = await (0, _db.execute)(queryDestination, param);

      return edit.rows[0];
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

      var param = [this.parcelId, this.userId];

      var query = 'SELECT status FROM parcels WHERE id_parcel = $1 AND id_user = $2';
      var parcel = await (0, _db.execute)(query, param);

      if (!parcel.rows.length) {
        return _constant2.default.NO_ENTRY;
      }

      var status = parcel.rows[0].status.trim();

      // dont cancel if already cancelled or delivered
      if (status === _constant2.default.DEFAULT_STATUS.delivered || status === _constant2.default.DEFAULT_STATUS.cancelled) {
        return false;
      }

      var queryCancel = 'UPDATE parcels SET status = $1 \n    WHERE id_parcel = $2 AND id_user = $3 RETURNING *';

      param.unshift(_constant2.default.DEFAULT_STATUS.cancelled.trim());
      var cancel = await (0, _db.execute)(queryCancel, param);

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
    value: async function getParcelNumber(userId, status) {
      var query = '';
      var parcel = void 0;
      this.userId = userId;
      this.status = status;
      var param = [this.userId];

      if (!this.status) {
        query = 'SELECT id_parcel FROM parcels WHERE id_user = $1';
        parcel = await (0, _db.execute)(query, param);
      } else {
        query = 'SELECT id_parcel FROM parcels WHERE status = $1 AND id_user = $2';
        param.unshift(this.status);
        parcel = await (0, _db.execute)(query, param);
      }

      return parcel.rows.length;
    }
  }]);

  return User;
}(_app2.default);

exports.default = User;