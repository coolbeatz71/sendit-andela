'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _user = require('../controllers/user');

var _user2 = _interopRequireDefault(_user);

var _auth = require('../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/**
 * TESTED
 * route to fetch all parcels delivery orders by a specific user
 * @method GET
 */
router.get('/:userId/parcels', _auth2.default, _user2.default.getAllParcels);

/**
 * TESTED
 * route to get the number of parcels delivery orders by a specific user
 * @method GET
 */
router.get('/parcels/count', _auth2.default, _user2.default.countParcels);

module.exports = router;