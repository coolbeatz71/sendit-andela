'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var endPoint = '' + apiUrl.domain + apiUrl.resource;

var Admin = function () {
  function Admin() {
    _classCallCheck(this, Admin);
  }

  _createClass(Admin, [{
    key: 'signIn',
    value: function signIn(email, password) {
      if (!email || !password) {
        return false;
      }
      var adminInfo = {
        email: email,
        password: password
      };

      return HttpRequest.post(endPoint + '/admin/login', adminInfo).then(function (result) {
        console.log(result);
        if (result.status === 'success') {
          localStorage.setItem('apiKey', result.user.token);
          localStorage.setItem('data', JSON.stringify(result.user));
          return result;
        }
        return result;
      });
    }
  }]);

  return Admin;
}();