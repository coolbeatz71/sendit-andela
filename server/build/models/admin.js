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
     * get the admin Id using his email
     *
     * @param  string email
     * @return string
     */

  }, {
    key: 'getAdminIdByEmail',
    value: function getAdminIdByEmail(email) {
      var _this = this;

      this.email = email;
      var myId = void 0;
      var adminData = this.app.readDataFile(adminFilePath);

      adminData.forEach(function (item) {
        if (item.email === _this.email) {
          myId = item.id;
        }
      });

      return myId;
    }

    /**
     * check whether the admin token is valid or not
     *
     * @param  string  authKey
     * @return boolean
     */

  }, {
    key: 'isTokenValid',
    value: function isTokenValid(authKey) {
      var adminData = this.app.readDataFile(adminFilePath);
      var admin = adminData.find(function (item) {
        return item.token === authKey;
      });

      return !!admin;
    }

    /**
     * get admin Id using the token (authKey)
     *
     * @param  string authKey
     * @return object || false
     */

  }, {
    key: 'getAdminIdByToken',
    value: function getAdminIdByToken(authKey) {
      var userData = this.app.readDataFile(adminFilePath);
      var user = userData.find(function (item) {
        return item.token === authKey;
      });

      return user ? user.id : false;
    }

    /**
     * edit presentLocation or status for a delivery order
     * @param  string userId
     * @param  string parcelId
     * @param  object params
     * @return {[type]}
     */

  }, {
    key: 'editParcel',
    value: function editParcel(parcelId) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      // get presentLocation and status
      var presentLocation = params.presentLocation,
          status = params.status;

      // read parcel json file

      var parcelData = this.app.readDataFile(parcelFilePath);

      var parcel = parcelData.find(function (el) {
        return el.orderId === parcelId;
      });

      if (!parcel || !presentLocation || !status || parcel.status === 'delivered') {
        return false;
      }

      // edit its presentLocation or status
      parcel.presentLocation = presentLocation;
      parcel.status = status;

      this.app.writeDataFile(parcelFilePath, parcelData);
      return parcel;
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