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
        response.status(404).json({
          status: 'fail',
          message: 'first name, last name, email and password are required'
        });
      } else {
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
    }
  }]);

  return AuthCtrl;
}();

exports.default = AuthCtrl;