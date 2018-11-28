'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _constant = require('./constant');

var _constant2 = _interopRequireDefault(_constant);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var adminFilePath = _path2.default.resolve(__dirname, '../../assets/admin.json');
var parcelFilePath = _path2.default.resolve(__dirname, '../../assets/parcels.json');

var Admin = function () {
  function Admin(email, password) {
    _classCallCheck(this, Admin);

    var app = new _app2.default();
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


  _createClass(Admin, [{
    key: 'loginAdmin',
    value: async function loginAdmin(email, password) {
      this.email = email;
      this.password = password;

      var isEmailExist = await this.app.isEmailExist(email, _constant2.default.ADMIN);

      // if the email doesnt exist
      if (!isEmailExist) {
        return _constant2.default.INVALID_EMAIL;
      }

      // get the admin password
      var query = 'SELECT password FROM admin WHERE email = $1';
      var result = await (0, _db2.default)(query, [email]);

      var hashPassword = result.rows[0].password.trim();

      // compare hashed and plain password
      if (!_bcrypt2.default.compareSync(password, hashPassword)) {
        return _constant2.default.INVALID_PASSWORD;
      }

      // get the admin Id
      var id = await this.app.getIdByEmail(email, _constant2.default.ADMIN);
      var adminId = id.id_admin;

      // generate the user token with jwt
      var userToken = _jsonwebtoken2.default.sign({
        id: adminId,
        email: email
      }, process.env.JWT_SECRET_TOKEN);

      // return user data
      var data = await this.app.getInfoById(adminId, _constant2.default.ADMIN);

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
     * @param  string adminId
     * @param  string parcelId
     * @param  string  status
     * @return boolean || array
     */

  }, {
    key: 'editParcelStatus',
    value: async function editParcelStatus(parcelId, newStatus) {
      this.parcelId = parcelId;
      this.newStatus = newStatus;

      if (newStatus === _constant2.default.DEFAULT_STATUS.cancelled) {
        return undefined;
      }

      var query = 'SELECT status FROM parcels WHERE id_parcel = $1';

      var parcel = await (0, _db2.default)(query, [parcelId]);

      if (parcel.rows.length <= 0) {
        return null;
      }

      var status = parcel.rows[0].status.trim();
      console.log(status);

      // dont edit status if already cancelled
      if (status === _constant2.default.DEFAULT_STATUS.cancelled) {
        return false;
      }

      var queryStatus = 'UPDATE parcels SET status = $1 \n    WHERE id_parcel = $2 RETURNING *';

      var edit = await (0, _db2.default)(queryStatus, [newStatus.trim(), parcelId]);

      return edit.rows[0];
    }

    /**
     * get Number of parcel delivery order by categories for all users
     * @param  string status
     * @return Number
     */

  }, {
    key: 'getParcelNumber',
    value: function getParcelNumber(status) {
      var parcelData = this.app.readDataFile(parcelFilePath);

      // if status is undefined, we should getAllParcel
      if (status) {
        var parcel = parcelData.filter(function (el) {
          return el.status === status;
        });
        return parcel.length;
      }
      return parcelData.length;
    }
  }]);

  return Admin;
}();

exports.default = Admin;