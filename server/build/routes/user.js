'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _auth = require('../controllers/auth');

var _auth2 = _interopRequireDefault(_auth);

var _user = require('../controllers/user');

var _user2 = _interopRequireDefault(_user);

var _user3 = require('../middleware/user');

var _user4 = _interopRequireDefault(_user3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/**
 * TESTED
 * route to sign-up the user
 * @method POST
 */
router.post('/signUp', _auth2.default.userSignUp);

/**
 * TESTED
 * route to sign-in the user to its account
 * @method POST
 */
router.post('/signIn', _auth2.default.userSignIn);

/**
 * TESTED
 * route to fetch all parcels delivery orders by a specific user
 * @method GET
 */
router.get('/:userId/parcels', _user4.default, _user2.default.getAllParcels);

module.exports = router;