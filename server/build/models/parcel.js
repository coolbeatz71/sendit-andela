'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import constants from './constant';

var parcelFilePath = _path2.default.resolve(__dirname, '../../assets/parcels.json');

var defaultStatus = {
  pending: 'pending',
  transit: 'in transit',
  delivered: 'delivered',
  cancelled: 'cancelled'
};

var Parcel = function () {
  function Parcel() {
    _classCallCheck(this, Parcel);

    var app = new _app2.default();
    this.app = app;
  }

  /**
   * create a parcel delivery order
   * @param  string senderId
   * @param  string parcelName
   * @param  string description
   * @param  string pickupLocation
   * @param  string destination
   * @param  int weight
   * @return object
   */


  _createClass(Parcel, [{
    key: 'createParcel',
    value: async function createParcel(senderId, parcelName, description, pickupLocation, destination, weight) {
      var presentLocation = '';
      var price = this.getParcelPrice(weight);
      var status = defaultStatus.pending;

      if (!senderId || !parcelName || !description || !pickupLocation || !destination || !weight) {
        return false;
      }

      var query = 'INSERT INTO parcels \n    (id_user, parcel_name, description, pickup_location,\n     present_location, destination, weight, price, status) \n    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';

      var insert = await (0, _db2.default)(query, [senderId, parcelName, description, pickupLocation, presentLocation, destination, weight, price, status]);
      var parcelInfo = insert.rows;

      return parcelInfo;
    }

    /**
     * get all parcel delivery order
     * @return array
     */

  }, {
    key: 'getAllParcel',
    value: async function getAllParcel() {
      // select all parcel info to the database
      var query = 'SELECT * FROM parcels';
      var result = await (0, _db2.default)(query);

      return result.rows;
    }

    /**
     * get all parcel delivery order for a particular user
     *
     * @param  string id
     * @return array
     */

  }, {
    key: 'getAllParcelByUser',
    value: async function getAllParcelByUser(id) {
      this.id = id;

      // select all parcel info to the database
      var query = 'SELECT * FROM parcels WHERE id_user = $1';
      var result = await (0, _db2.default)(query, [id]);

      return result.rows;
    }

    /**
     * get a single parcel order by orderId
     *
     * @param  string orderId
     * @return string
     */

  }, {
    key: 'getParcelById',
    value: function getParcelById(orderId) {
      var parcelData = this.app.readDataFile(parcelFilePath);

      var parcel = parcelData.filter(function (el) {
        return el.orderId === orderId;
      });

      if (parcel.length < 1) {
        return null;
      }
      return parcel;
    }

    /**
     * get the parcel price from its weight
     * @param float weight
     * @return int
     */

  }, {
    key: 'getParcelPrice',
    value: function getParcelPrice(weight) {
      var unitPrice = 500;
      this.price = weight * unitPrice;
      return Number.parseInt(this.price, 10);
    }
  }]);

  return Parcel;
}();

exports.default = Parcel;