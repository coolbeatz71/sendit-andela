'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var endPoint = '' + apiUrl.domain + apiUrl.resource;

var User = function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, [{
    key: 'signUp',
    value: function signUp(firstName, lastName, email, password) {
      if (!firstName || !lastName || !email || !password) {
        return false;
      }
      var userInfo = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      };

      return HttpRequest.post(endPoint + '/auth/signUp', userInfo).then(function (result) {
        if (result.status === 'success') {
          localStorage.setItem('apiKey', result.user.token);
          localStorage.setItem('data', JSON.stringify(result.user));
          return result;
        }
        return result;
      });
    }
  }, {
    key: 'signIn',
    value: function signIn(email, password) {
      if (!email || !password) {
        return false;
      }
      var userInfo = {
        email: email,
        password: password
      };

      return HttpRequest.post(endPoint + '/auth/login', userInfo).then(function (result) {
        if (result.status === 'success') {
          localStorage.setItem('apiKey', result.user.token);
          localStorage.setItem('data', JSON.stringify(result.user));
          return result;
        }
        return result;
      });
    }
  }]);

  return User;
}();