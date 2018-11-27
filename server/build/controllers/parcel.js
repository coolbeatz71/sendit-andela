'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // importing models


var _parcel = require('../models/parcel');

var _parcel2 = _interopRequireDefault(_parcel);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ParcelCtrl = function () {
  function ParcelCtrl() {
    _classCallCheck(this, ParcelCtrl);
  }

  _createClass(ParcelCtrl, null, [{
    key: 'getAllParcels',

    /**
     * get All parcels for all users
     * @param  Request request
     * @param  Response response
     * @return object json
     */
    value: async function getAllParcels(request, response) {
      var parcel = new _parcel2.default();
      var getParcel = await parcel.getAllParcel();

      response.status(200).json({
        status: 'success',
        parcel: getParcel
      });
    }
  }, {
    key: 'createParcel',
    value: function createParcel(request, response) {
      // get sign data from the request body
      var _request$body = request.body,
          parcelName = _request$body.parcelName,
          description = _request$body.description,
          pickupLocation = _request$body.pickupLocation,
          destination = _request$body.destination,
          weight = _request$body.weight;

      // We should get the userId using the authKey in the header

      var authKey = request.headers.authorization.split(' ')[1];

      var user = new _user2.default();
      var userId = user.getUserIdByToken(authKey);

      if (!parcelName || !description || !pickupLocation || !destination || !weight) {
        response.status(404).json({
          status: 'fail',
          message: 'Fill all required fields'
        });
      } else {
        var parcel = new _parcel2.default();
        var createParcel = parcel.createParcel(userId, parcelName, description, pickupLocation, destination, weight);
        response.status(201).json({
          status: 'success',
          parcel: createParcel
        });
      }
    }
  }, {
    key: 'getParcelById',
    value: function getParcelById(request, response) {
      var parcelId = request.params.parcelId;


      var parcel = new _parcel2.default();
      var getParcel = parcel.getParcelById(parcelId);

      if (!getParcel) {
        response.status(404).json({
          status: 'fail',
          message: 'No parcel found, wrong parcel Id'
        });
      } else {
        response.status(200).json({
          status: 'success',
          parcel: getParcel
        });
      }
    }
  }, {
    key: 'cancelParcel',
    value: function cancelParcel(request, response) {
      var parcelId = request.params.parcelId;


      var user = new _user2.default();

      // get the AuthKey from the header to help retrieving the userId
      var authKey = request.headers.authorization.split(' ')[1];

      // get the userId
      var userId = user.getUserIdByToken(authKey);

      var cancel = user.cancelParcel(userId, parcelId);

      if (cancel === null) {
        response.status(400).json({
          status: 'fail',
          message: 'id of the parcel is required'
        });
      } else if (cancel === undefined) {
        response.status(404).json({
          status: 'fail',
          message: 'No parcel order found with this id'
        });
      } else if (!cancel) {
        response.status(401).json({
          status: 'fail',
          message: 'Not authorized to cancel this parcel order'
        });
      } else {
        response.status(200).json({
          status: 'success',
          parcel: cancel
        });
      }
    }
  }]);

  return ParcelCtrl;
}();

exports.default = ParcelCtrl;