'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var endPoint = apiUrl.domain + ':' + apiUrl.port + apiUrl.resource;

var User = function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, [{
    key: 'signIn',
    value: function signIn(email, password) {
      if (!email || !password) {
        return false;
      } else {
        var adminInfo = {
          email: email,
          password: password
        };

        return HttpRequest.post(endPoint + '/admin/signIn', adminInfo).then(function (result) {
          if (!result.body.error) {
            localStorage.setItem('apiKey', result.body.data.token);
            localStorage.setItem('data', JSON.stringify(result.body.data));
            return result;
          } else {
            return result;
          }
        });
      }
    }
  }]);

  return User;
}();