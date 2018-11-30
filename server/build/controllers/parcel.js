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
     * get All parcels for all users (for the admin)
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

    /**
     * create a new parcel delivery order
     * @param  Request request
     * @param  Response response
     * @return object json
     */

  }, {
    key: 'createParcel',
    value: async function createParcel(request, response) {
      // get parcel data from the request body
      var _request$body = request.body,
          parcelName = _request$body.parcelName,
          description = _request$body.description,
          pickupLocation = _request$body.pickupLocation,
          destination = _request$body.destination,
          weight = _request$body.weight;


      var userId = response.locals.id;

      request.checkBody('parcelName', 'parcel name is required').notEmpty();
      request.checkBody('description', 'description is required').notEmpty();
      request.checkBody('pickupLocation', 'pickupLocation is required').notEmpty();
      request.checkBody('destination', 'destination is required').notEmpty();
      request.checkBody('weight', 'parcel weight is required').notEmpty().isNumeric().withMessage('parcel weight must be a number');

      var errors = request.validationErrors();

      if (!parcelName || !description || !pickupLocation || !destination || !weight) {
        response.status(400).json({
          status: 'fail',
          message: 'Fill all required fields'
        });
      }

      if (errors) {
        response.status(400).json({
          status: 'fail',
          message: errors
        });
      } else {
        var parcel = new _parcel2.default();
        var createParcel = await parcel.createParcel(userId, parcelName, description, pickupLocation, destination, weight);
        response.status(201).json({
          status: 'success',
          parcel: createParcel
        });
      }
    }

    /**
     * return a specific parcel delivery order (ADMIN)
     * @param  Request request
     * @param  Response response
     * @return object json
     */

  }, {
    key: 'getParcelById',
    value: async function getParcelById(request, response) {
      var parcelId = request.params.parcelId;


      request.check('parcelId', 'parcel id is required').notEmpty().isInt().withMessage('parcel id must be a number');

      var errors = request.validationErrors();

      if (errors) {
        response.status(400).json({
          status: 'fail',
          message: errors
        });
      } else {
        var parcel = new _parcel2.default();
        var getParcel = await parcel.getParcelById(parcelId);

        if (!getParcel.length) {
          response.status(404).json({
            status: 'fail',
            message: 'No parcel found with this parcel Id'
          });
        } else {
          response.status(200).json({
            status: 'success',
            parcel: getParcel
          });
        }
      }
    }

    /**
     * cancel a particular parcel order
     * @param  Request request
     * @param  Response response
     * @return object json
     */

  }, {
    key: 'cancelParcel',
    value: async function cancelParcel(request, response) {
      var parcelId = request.params.parcelId;

      var userId = response.locals.id;

      request.check('parcelId', 'parcel id is required').notEmpty().isInt().withMessage('parcel id must be a number');

      var errors = request.validationErrors();

      if (errors) {
        response.status(400).json({
          status: 'fail',
          message: errors
        });
      } else {
        var user = new _user2.default();
        var cancel = await user.cancelParcel(userId, parcelId);

        if (cancel === null) {
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
    }

    /**
     * edit destination of a particular parcel order
     * @param  Request request
     * @param  Response response
     * @return object json
     */

  }, {
    key: 'editDestination',
    value: async function editDestination(request, response) {
      var parcelId = request.params.parcelId;
      var destination = request.body.destination;

      var userId = response.locals.id;

      request.check('parcelId', 'parcel id is required').notEmpty().isInt().withMessage('parcel id must be a number');

      request.checkBody('destination', 'new destination is required').notEmpty().isAlpha().withMessage('new destination must only contains alphabetic sysmbols');

      var errors = request.validationErrors();

      if (errors) {
        response.status(400).json({
          status: 'fail',
          message: errors
        });
      } else {
        var user = new _user2.default();
        var edit = await user.editParcelDestination(userId, parcelId, destination);

        if (edit === null) {
          response.status(404).json({
            status: 'fail',
            message: 'No parcel order found with this id'
          });
        } else if (!edit) {
          response.status(401).json({
            status: 'fail',
            message: 'Not authorized to edit destination of this parcel order'
          });
        } else {
          response.status(200).json({
            status: 'success',
            parcel: edit
          });
        }
      }
    }
  }]);

  return ParcelCtrl;
}();

exports.default = ParcelCtrl;