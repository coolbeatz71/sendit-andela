'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constant = require('./constant');

var _constant2 = _interopRequireDefault(_constant);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
  function App() {
    _classCallCheck(this, App);
  }

  _createClass(App, [{
    key: 'isEmailExist',

    /**
     * check if the email exist in the DB
     *
     * @param  string email
     * @param  string role [either admin or user]
     * @return boolean
     */
    value: async function isEmailExist(email, role) {
      var query = void 0;
      this.email = email;
      this.role = role;

      switch (this.role) {
        case _constant2.default.USER:
          query = 'SELECT id_user FROM users WHERE email = $1';
          break;
        case _constant2.default.ADMIN:
          query = 'SELECT id_admin FROM admin WHERE email = $1';
          break;
        default:
          query = 'SELECT id_user FROM users WHERE email = $1';
          break;
      }

      var result = await (0, _db2.default)(query, [email]);
      return result.rowCount > 0;
    }

    /**
     * return the Id using the email
     *
     * @param  string email
     * @param  string role [either admin or user]
     * @return object
     */

  }, {
    key: 'getIdByEmail',
    value: async function getIdByEmail(email, role) {
      var query = void 0;
      this.email = email;
      this.role = role;

      switch (this.role) {
        case _constant2.default.USER:
          query = 'SELECT id_user FROM users WHERE email = $1';
          break;
        case _constant2.default.ADMIN:
          query = 'SELECT id_admin FROM admin WHERE email = $1';
          break;
        default:
          query = 'SELECT id_user FROM users WHERE email = $1';
          break;
      }

      var result = await (0, _db2.default)(query, [email]);
      return result.rows[0];
    }

    /**
     * return all profile information
     *
     * @param  string id
     * @param  string role [either admin or user]
     * @return object
     */

  }, {
    key: 'getInfoById',
    value: async function getInfoById(id, role) {
      var query = void 0;
      this.id = id;
      this.role = role;

      switch (this.role) {
        case _constant2.default.USER:
          query = 'SELECT id_user, first_name, last_name, email FROM users WHERE id_user = $1';
          break;
        case _constant2.default.ADMIN:
          query = 'SELECT id_admin, first_name, last_name, email FROM admin WHERE id_admin = $1';
          break;
        default:
          query = 'SELECT id_user, first_name, last_name, email FROM users WHERE id_user = $1';
          break;
      }
      var result = await (0, _db2.default)(query, [id]);
      return result.rows[0];
    }
  }]);

  return App;
}();

exports.default = App;