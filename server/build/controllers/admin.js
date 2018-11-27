'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // importing models


var _admin = require('../models/admin');

var _admin2 = _interopRequireDefault(_admin);

var _constant = require('../models/constant');

var _constant2 = _interopRequireDefault(_constant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdminCtrl = function () {
  function AdminCtrl() {
    _classCallCheck(this, AdminCtrl);
  }

  _createClass(AdminCtrl, null, [{
    key: 'adminSignIn',

    /**
     * signIn the admin
     * @param  string request
     * @param  string response
     * @return object json
     */
    value: async function adminSignIn(request, response) {
      // get sign data from the request body
      var _request$body = request.body,
          email = _request$body.email,
          password = _request$body.password;


      if (!email || !password) {
        response.status(400).json({
          status: 'fail',
          message: 'Email and password are required'
        });
      }

      request.checkBody('email', 'email is required').notEmpty().trim().isEmail().withMessage('Invalid email format');
      request.checkBody('password', 'password is required').notEmpty().isAlphanumeric().trim().withMessage('The password must contains alphabetic or numeric symbols');

      var errors = request.validationErrors();

      if (errors) {
        response.status(400).json({
          status: 'fail',
          message: errors
        });
      } else {
        var admin = new _admin2.default();
        var login = await admin.loginAdmin(email, password);

        if (login === _constant2.default.INVALID_EMAIL) {
          response.status(404).json({
            status: 'fail',
            message: 'User not found, Incorrect email address'
          });
        } else if (login === _constant2.default.INVALID_PASSWORD) {
          response.status(404).json({
            status: 'fail',
            message: 'the password is incorrect'
          });
        } else {
          response.status(200).json({
            status: 'success',
            user: login
          });
        }
      }
    }
  }]);

  return AdminCtrl;
}();

exports.default = AdminCtrl;