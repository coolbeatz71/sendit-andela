'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // importing models


var _parcel = require('../models/parcel');

var _parcel2 = _interopRequireDefault(_parcel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ParcelCtrl = function () {
  function ParcelCtrl() {
    _classCallCheck(this, ParcelCtrl);
  }

  _createClass(ParcelCtrl, null, [{
    key: 'getAllParcels',
    value: function getAllParcels(request, response) {
      var parcel = new _parcel2.default();
      var getParcel = parcel.getAllParcel();

      response.status(200).json({
        status: 'fail',
        parcel: getParcel
      });
    }
  }]);

  return ParcelCtrl;
}();

exports.default = ParcelCtrl;