'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _constant = require('./constant');

var _constant2 = _interopRequireDefault(_constant);

var _db = require('./db');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Admin = function (_App) {
  _inherits(Admin, _App);

  function Admin() {
    _classCallCheck(this, Admin);

    return _possibleConstructorReturn(this, (Admin.__proto__ || Object.getPrototypeOf(Admin)).apply(this, arguments));
  }

  _createClass(Admin, [{
    key: 'loginAdmin',

    /**
     * login the admin to his account
     *
     * @param  string email
     * @param  string password
     * @return object | constant
     */
    value: async function loginAdmin(email, password) {
      var loginData = [];
      this.email = email;
      this.password = password;

      loginData.push(this.email);

      var isEmailExist = await this.isEmailExist(this.email, _constant2.default.ADMIN);

      // if the email doesnt exist
      if (!isEmailExist) {
        return _constant2.default.INVALID_EMAIL;
      }

      // get the admin password
      var query = 'SELECT password FROM admin WHERE email = $1';
      var result = await (0, _db.execute)(query, loginData);

      var hashPassword = result.rows[0].password.trim();

      // compare hashed and plain password
      if (!_bcrypt2.default.compareSync(this.password, hashPassword)) {
        return _constant2.default.INVALID_PASSWORD;
      }

      // get the admin Id
      var id = await this.getIdByEmail(this.email, _constant2.default.ADMIN);
      var adminId = id.id_admin;

      // generate the user token with jwt
      var userToken = _jsonwebtoken2.default.sign({
        id: adminId,
        email: email
      }, process.env.JWT_SECRET_TOKEN);

      // return user data
      var data = await this.getInfoById(adminId, _constant2.default.ADMIN);

      return {
        id: adminId,
        firstName: data.first_name.trim(),
        lastName: data.last_name.trim(),
        email: data.email.trim(),
        token: userToken
      };
    }

    /**
     * edit the status of parcel by the admin
     *
     * @param  string parcelId
     * @param  string  status
     * @return boolean || array
     */

  }, {
    key: 'editParcelStatus',
    value: async function editParcelStatus(parcelId, newStatus) {
      var param = [];
      this.parcelId = parcelId;
      this.newStatus = newStatus;

      param.push(this.parcelId);

      var query = 'SELECT status FROM parcels WHERE id_parcel = $1';

      var parcel = await (0, _db.execute)(query, param);

      if (!parcel.rows.length) {
        return _constant2.default.NO_ENTRY;
      }

      param.unshift(this.newStatus);

      var queryStatus = 'UPDATE parcels SET status = $1 \n    WHERE id_parcel = $2 RETURNING *';

      var edit = await (0, _db.execute)(queryStatus, param);

      return edit.rows[0];
    }

    /**
     * edit present location of parcel by the admin
     *
     * @param  string parcelId
     * @param  string  location
     * @return boolean || array
     */

  }, {
    key: 'editPresentLocation',
    value: async function editPresentLocation(parcelId, location) {
      var param = [];
      this.parcelId = parcelId;
      this.location = location;

      param.push(this.parcelId);

      var query = 'SELECT status FROM parcels WHERE id_parcel = $1';

      var parcel = await (0, _db.execute)(query, param);

      if (!parcel.rows.length) {
        return _constant2.default.NO_ENTRY;
      }

      param.unshift(this.location);

      var queryLocation = 'UPDATE parcels SET present_location = $1 \n    WHERE id_parcel = $2 RETURNING *';

      var edit = await (0, _db.execute)(queryLocation, param);

      return edit.rows[0];
    }

    /**
     * get Number of parcel delivery order by categories for all users
     * @param  string status
     * @return Number
     */

  }, {
    key: 'getParcelNumber',
    value: async function getParcelNumber(status) {
      var query = '';
      var parcel = void 0;
      var param = [];
      this.status = status;
      param.push(this.status);

      if (!this.status) {
        query = 'SELECT id_parcel FROM parcels';
        parcel = await (0, _db.execute)(query);
      } else {
        query = 'SELECT id_parcel FROM parcels WHERE status = $1';
        parcel = await (0, _db.execute)(query, param);
      }

      return parcel.rows.length;
    }
  }]);

  return Admin;
}(_app2.default);

exports.default = Admin;