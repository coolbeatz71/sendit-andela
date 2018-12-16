'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var endPoint = '' + apiUrl.domain + apiUrl.resource;

var Parcel = function () {
  function Parcel() {
    _classCallCheck(this, Parcel);
  }

  _createClass(Parcel, [{
    key: 'getApiKey',

    /**
     * get the api from localStorage
     * @return string
     */
    value: function getApiKey() {
      var apiKey = localStorage.getItem('apiKey');
      return apiKey;
    }

    /**
     * get the user Id from localStorage
     * @return string
     */

  }, {
    key: 'getUserId',
    value: function getUserId() {
      var userData = JSON.parse(localStorage.getItem('data'));
      var userId = userData.id;
      return userId;
    }

    /**
     * send HTTP request to get all parcels
     * @return Promise
     */

  }, {
    key: 'getAllParcel',
    value: function getAllParcel() {
      var apiKey = this.getApiKey();

      return HttpRequest.getWithHeader(endPoint + '/parcels/', apiKey).then(function (result) {
        return result;
      });
    }

    /**
     * send HTTP request to create new parcel
     * @param  string parcelName
     * @param  string description
     * @param  string pickupLocation
     * @param  string destination
     * @param  string weight
     * @return Promise
     */

  }, {
    key: 'createParcel',
    value: function createParcel(parcelName, description, pickupLocation, destination, weight) {
      var parcelInfo = {
        parcelName: parcelName,
        description: description,
        pickupLocation: pickupLocation,
        destination: destination,
        weight: weight
      };

      var apiKey = this.getApiKey();

      return HttpRequest.postWithHeader(endPoint + '/parcels', parcelInfo, apiKey).then(function (result) {
        return result;
      });
    }

    /**
     * send HTTP request to get parcel for a user
     * @return Promise
     */

  }, {
    key: 'getAllParcelByUser',
    value: function getAllParcelByUser() {
      var userId = this.getUserId();
      var apiKey = this.getApiKey();

      return HttpRequest.getWithHeader(endPoint + '/users/' + userId + '/parcels/', apiKey).then(function (result) {
        return result;
      });
    }

    /**
     * get HTTP request to get parcel by ID
     * @param  int parcelId
     * @return Promise
     */

  }, {
    key: 'getParcelById',
    value: function getParcelById(parcelId) {
      var userId = this.getUserId();
      var apiKey = this.getApiKey();

      return HttpRequest.getWithHeader(endPoint + '/parcels/' + parcelId, apiKey).then(function (result) {
        return result;
      });
    }

    /**
     * send HTTP request to count parcels for a user
     * @return Promise
     */

  }, {
    key: 'countParcelByUser',
    value: function countParcelByUser() {
      var apiKey = this.getApiKey();

      return HttpRequest.getWithHeader(endPoint + '/users/parcels/count', apiKey).then(function (result) {
        return result;
      });
    }

    /**
     * send HTTP request to count parcels for all user
     * @return Promise
     */

  }, {
    key: 'countParcelByAdmin',
    value: function countParcelByAdmin() {
      var apiKey = this.getApiKey();

      return HttpRequest.getWithHeader(endPoint + '/admin/parcels/count', apiKey).then(function (result) {
        return result;
      });
    }

    /**
     * send HTTP request to edit parcel destination by user
     * @param  int parcelId
     * @param  string newDestination
     * @return Promise
     */

  }, {
    key: 'editDestination',
    value: function editDestination(parcelId, newDestination) {
      var apiKey = this.getApiKey();
      var parcelInfo = {
        destination: newDestination
      };

      return HttpRequest.putWithHeader(endPoint + '/parcels/' + parcelId + '/destination', parcelInfo, apiKey).then(function (result) {
        return result;
      });
    }

    /**
     * send HTTP request to edit parcel present location by admin
     * @param  int parcelId
     * @param  string presentLocation
     * @return Promise
     */

  }, {
    key: 'editPresentLocation',
    value: function editPresentLocation(parcelId, presentLocation) {
      var apiKey = this.getApiKey();
      var parcelInfo = {
        presentLocation: presentLocation
      };

      return HttpRequest.putWithHeader(endPoint + '/parcels/' + parcelId + '/presentLocation', parcelInfo, apiKey).then(function (result) {
        return result;
      });
    }

    /**
     * send HTTP request to edit parcel status by admin
     * @param  int parcelId
     * @param  string status
     * @return Promise
     */

  }, {
    key: 'editStatus',
    value: function editStatus(parcelId, status) {
      var apiKey = this.getApiKey();
      var parcelInfo = {
        status: status
      };

      return HttpRequest.putWithHeader(endPoint + '/parcels/' + parcelId + '/status', parcelInfo, apiKey).then(function (result) {
        return result;
      });
    }

    /**
     * send HTTP request to cancel parcel delivery order
     * @param  int parcelId
     * @return promise
     */

  }, {
    key: 'cancelParcel',
    value: function cancelParcel(parcelId) {
      var apiKey = this.getApiKey();

      console.log(apiKey);

      return HttpRequest.putWithHeader(endPoint + '/parcels/' + parcelId + '/cancel', {}, apiKey).then(function (result) {
        return result;
      });
    }
  }]);

  return Parcel;
}();