'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // importing models


var _parcel = require('../models/parcel');

var _parcel2 = _interopRequireDefault(_parcel);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _app = require('../models/app');

var _app2 = _interopRequireDefault(_app);

var _constant = require('../models/constant');

var _constant2 = _interopRequireDefault(_constant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserCtrl = function () {
  function UserCtrl() {
    _classCallCheck(this, UserCtrl);
  }

  _createClass(UserCtrl, null, [{
    key: 'getAllParcels',

    /**
     * get All parcels for a user
     * @param  Request request
     * @param  Response response
     * @return object json
     */
    value: async function getAllParcels(request, response) {
      var userId = request.params.userId;
      var email = response.locals.email;


      request.check('userId', 'the user id is required').notEmpty().isInt().withMessage('userId must be a number');

      var errors = request.validationErrors();

      if (errors) {
        response.status(400).json({
          status: 'fail',
          message: errors
        });
      } else {
        var app = new _app2.default();
        var parcel = new _parcel2.default();

        // get the user id from the DB
        var user = await app.getIdByEmail(email, _constant2.default.USER);

        if (userId.toString() === user.id_user.toString()) {
          var getParcel = await parcel.getAllParcelByUser(userId);
          response.status(200).json({
            status: 'success',
            parcel: getParcel
          });
        } else {
          response.status(401).json({
            status: 'fail',
            message: 'Not Authorized, can only view your own parcels'
          });
        }
      }
    }

    /**
     * count the number of parcels according to their status
     *
     * @param  Request request
     * @param  Response response
     * @return object json
     */

  }, {
    key: 'countParcels',
    value: async function countParcels(request, response) {
      var _response$locals = response.locals,
          id = _response$locals.id,
          email = _response$locals.email;
      var _constants$DEFAULT_ST = _constant2.default.DEFAULT_STATUS,
          pending = _constants$DEFAULT_ST.pending,
          transit = _constants$DEFAULT_ST.transit,
          delivered = _constants$DEFAULT_ST.delivered,
          cancelled = _constants$DEFAULT_ST.cancelled;


      var app = new _app2.default();
      var isUser = await app.isEmailExist(email, _constant2.default.USER);

      if (!isUser) {
        response.status(403).json({
          status: 'fail',
          message: 'Forbidden, Invalid user authentication key'
        });
      }

      var user = new _user2.default();
      var all = await user.getParcelNumber(id);
      var parcelPending = await user.getParcelNumber(id, pending);
      var parcelInTransit = await user.getParcelNumber(id, transit);
      var parcelDelivered = await user.getParcelNumber(id, delivered);
      var parcelCancelled = await user.getParcelNumber(id, cancelled);

      response.status(200).json({
        status: 'success',
        parcel: {
          all: all,
          pending: parcelPending,
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