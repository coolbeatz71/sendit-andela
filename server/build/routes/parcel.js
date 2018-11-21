'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _parcel = require('../controllers/parcel');

var _parcel2 = _interopRequireDefault(_parcel);

var _user = require('../middleware/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/**
 * route to fetch all parcels delivery orders
 * @method GET
 */
router.get('/', _user2.default, _parcel2.default.getAllParcels);

/**
 * route to create a parcel delivery order
 * @method POST
 */
router.post('/', _user2.default, _parcel2.default.createParcel);

/**
 * route to fetch a specific delivery order by its ID
 * @method GET
 */
router.get('/:parcelId', _user2.default, _parcel2.default.getParcelById);

/**
 * routes for cancelling parcel delivery order
 * @method PUT
 */
router.put('/:parcelId/cancel', _user2.default, _parcel2.default.cancelParcel);

module.exports = router;