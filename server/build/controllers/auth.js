'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // importing models


var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthCtrl = function () {
  function AuthCtrl() {
    _classCallCheck(this, AuthCtrl);
  }

  _createClass(AuthCtrl, null, [{
    key: 'userSignUp',
    value: function userSignUp(request, response) {
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

      request.checkBody('firstName').notEmpty().isAlpha().withMessage('Must only contains alphabetic symbols');
      request.checkBody('lastName').notEmpty().isAlpha().withMessage('Must only contains alphabetic symbols');
      request.checkBody('email').notEmpty().isEmail().withMessage('Invalid email format');
      request.checkBody('password').notEmpty().isAlphanumeric().withMessage('Must contains alphabetic or numeric symbols');

      var errors = request.validationErrors();

      if (errors) {
        response.status(400).json({
          status: 'fail',
          message: errors
        });
      }

      var user = new _user2.default();
      var signUp = user.createUser(firstName, lastName, email, password);

      if (!signUp) {
        response.status(409).json({
          status: 'fail',
          message: 'the entered email is already used by an account'
        });
      } else {
        response.status(201).json({
          status: 'success',
          user: signUp
        });
      }
    }
  }, {
    key: 'userSignIn',
    value: function userSignIn(request, response) {
      // get sign data from the request body
      var _request$body2 = request.body,
          email = _request$body2.email,
          password = _request$body2.password;


      if (!email || !password) {
        response.status(400).json({
          status: 'fail',
          message: 'Email and password are required'
        });
      } else {
        var user = new _user2.default();
        var userInfo = user.getUser(email, password);

        if (userInfo) {
          response.status(200).json({
            status: 'success',
            user: userInfo
          });
        } else {
          response.status(404).json({
            status: 'fail',
            message: 'User not found, Incorrect email or password'
          });
        }
      }
    }
  }]);

  return AuthCtrl;
}();

exports.default = AuthCtrl;