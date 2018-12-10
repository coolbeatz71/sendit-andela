'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // importing models


var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _constant = require('../models/constant');

var _constant2 = _interopRequireDefault(_constant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthCtrl = function () {
  function AuthCtrl() {
    _classCallCheck(this, AuthCtrl);
  }

  _createClass(AuthCtrl, null, [{
    key: 'userSignUp',

    /**
     * signUp the user
     * @param  string request
     * @param  string response
     * @return object json
     */
    value: async function userSignUp(request, response) {
      var _request$body = request.body,
          firstName = _request$body.firstName,
          lastName = _request$body.lastName,
          email = _request$body.email,
          password = _request$body.password;


      if (!firstName || !lastName || !email || !password) {
        response.status(400).json({
          status: 'fail',
          message: 'first name, last name, email and password are required'
        });
      }

      request.checkBody('firstName', 'first name is required').notEmpty().isAlpha().trim().withMessage('First name must only contains alphabetic symbols');
      request.checkBody('lastName', 'last name is required').notEmpty().isAlpha().trim().withMessage('Last name must only contains alphabetic symbols');
      request.checkBody('email', 'email is required').notEmpty().trim().isEmail().withMessage('Invalid email format');
      request.checkBody('password', 'password is required').notEmpty().isAlphanumeric().trim().withMessage('The password must contains alphabetic or numeric symbols');

      var errors = request.validationErrors();

      if (errors) {
        response.status(400).json({
          status: 'fail',
          error: 'validation',
          message: errors
        });
      } else {
        var user = new _user2.default();
        var signUp = await user.createUser(firstName, lastName, email, password);

        if (signUp === _constant2.default.EMAIL_EXIST) {
          response.status(409).json({
            status: 'fail',
            message: 'The entered email is already used by an account'
          });
        } else {
          response.status(201).json({
            status: 'success',
            user: signUp
          });
        }
      }
    }

    /**
     * signIn the user
     * @param  string request
     * @param  string response
     * @return object json
     */

  }, {
    key: 'userSignIn',
    value: async function userSignIn(request, response) {
      // get sign data from the request body
      var _request$body2 = request.body,
          email = _request$body2.email,
          password = _request$body2.password;


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
          error: 'validation',
          message: errors
        });
      } else {
        var user = new _user2.default();
        var login = await user.loginUser(email, password);

        if (login === _constant2.default.INVALID_EMAIL || login === _constant2.default.INVALID_PASSWORD) {
          response.status(404).json({
            status: 'fail',
            message: 'User not found, Incorrect email or password'
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

  return AuthCtrl;
}();

exports.default = AuthCtrl;