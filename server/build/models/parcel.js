'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _db = require('./db');

var _constant = require('./constant');

var _constant2 = _interopRequireDefault(_constant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Parcel = function (_App) {
  _inherits(Parcel, _App);

  function Parcel() {
    _classCallCheck(this, Parcel);

    return _possibleConstructorReturn(this, (Parcel.__proto__ || Object.getPrototypeOf(Parcel)).apply(this, arguments));
  }

  _createClass(Parcel, [{
    key: 'createParcel',

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
    value: async function createParcel(senderId, parcelName, description, pickupLocation, destination, weight) {
      var presentLocation = '';
      var price = this.getParcelPrice(weight);
      var status = _constant2.default.DEFAULT_STATUS.pending;

      if (!senderId || !parcelName || !description || !pickupLocation || !destination || !weight) {
        return false;
      }

      var param = [senderId, parcelName.trim(), description.trim(), pickupLocation.trim(), presentLocation.trim(), destination.trim(), weight, price, status.trim()];

      var query = 'INSERT INTO parcels \n    (id_user, parcel_name, description, pickup_location,\n     present_location, destination, weight, price, status) \n    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';

      var insert = await (0, _db.execute)(query, param);
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
      var query = 'SELECT * FROM parcels ORDER BY id_parcel DESC';
      var result = await (0, _db.execute)(query);

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
      var param = [this.id];

      // select all parcel info to the database
      var query = 'SELECT * FROM parcels WHERE id_user = $1 ORDER BY id_parcel DESC';
      var result = await (0, _db.execute)(query, param);

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
    value: async function getParcelById(orderId) {
      this.orderId = orderId;
      var param = [orderId];

      // select all parcel info to the database
      var query = 'SELECT * FROM parcels WHERE id_parcel = $1';
      var result = await (0, _db.execute)(query, param);

      return result.rows;
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
}(_app2.default);

exports.default = Parcel;