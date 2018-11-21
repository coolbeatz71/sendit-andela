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

var UserCtrl = function () {
  function UserCtrl() {
    _classCallCheck(this, UserCtrl);
  }

  _createClass(UserCtrl, null, [{
    key: 'getAllParcels',
    value: function getAllParcels(request, response) {
      var userId = request.params.userId;


      var parcel = new _parcel2.default();
      var getParcel = parcel.getAllParcelByUser(userId);

      response.status(200).json({
        status: 'success',
        parcel: getParcel
      });
    }
  }, {
    key: 'countParcels',
    value: function countParcels(request, response) {
      // split the header value to get only teh authKey (Bearer wuyhdu3Y488478Eehjh...)
      var authKey = request.headers.authorization.split(' ')[1];

      var delivered = 'delivered';
      var inTransit = 'in transit';
      var cancelled = 'cancelled';
      // verify the authKey
      var user = new _user2.default();
      var userId = user.getUserIdByToken(authKey);

      var all = user.getParcelNumber(userId);
      var parcelDelivered = user.getParcelNumber(userId, delivered);
      var parcelInTransit = user.getParcelNumber(userId, inTransit);
      var parcelCancelled = user.getParcelNumber(userId, cancelled);

      response.status(200).json({
        status: 'success',
        parcel: {
          all: all,
          delivered: parcelDelivered,
          inTransit: parcelInTransit,
          cancelled: parcelCancelled
        }
      });
    }
  }]);

  return UserCtrl;
}();

exports.default = UserCtrl;