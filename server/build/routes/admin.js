'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _admin = require('../controllers/admin');

var _admin2 = _interopRequireDefault(_admin);

var _auth = require('../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/**
 * TESTED
 * route to sign-in the admin to its account
 * @method POST
 */
router.post('/login', _admin2.default.adminSignIn);

/**
 * TESTED
 * route to get the number of parcels delivery orders for all users
 * @method GET
 */
router.get('/parcels/count', _auth2.default, _admin2.default.countParcels);

module.exports = router;