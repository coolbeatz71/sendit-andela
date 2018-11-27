'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _admin = require('../controllers/admin');

var _admin2 = _interopRequireDefault(_admin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/**
 * TESTED
 * route to sign-in the admin to its account
 * @method POST
 */
router.post('/login', _admin2.default.adminSignIn);

module.exports = router;