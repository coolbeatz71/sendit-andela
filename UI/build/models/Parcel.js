'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var endPoint = apiUrl.domain + ':' + apiUrl.port + apiUrl.resource;

var Parcel = function () {
  function Parcel() {
    _classCallCheck(this, Parcel);
  }

  _createClass(Parcel, [{
    key: 'getAllParcel',
    value: function getAllParcel() {
      var apiKey = localStorage.getItem('apiKey');

      return HttpRequest.getWithHeader(endPoint + '/parcels/', apiKey).then(function (result) {
        return result;
      });
    }
  }, {
    key: 'getUserId',
    value: function getUserId() {
      var userData = JSON.parse(localStorage.getItem('data'));
      var userId = userData.id;
      return userId;
    }
  }, {
    key: 'getAllParcelByUser',
    value: function getAllParcelByUser() {
      var userId = this.getUserId();
      var apiKey = localStorage.getItem('apiKey');
      console.log(apiKey);

      return HttpRequest.getWithHeader(endPoint + '/users/' + userId + '/parcels/', apiKey).then(function (result) {
        return result;
      });
    }
  }, {
    key: 'countParcelByUser',
    value: function countParcelByUser() {
      var apiKey = localStorage.getItem('apiKey');

      return HttpRequest.getWithHeader(endPoint + '/users/parcels/count', apiKey).then(function (result) {
        return result;
      });
    }
  }]);

  return Parcel;
}();