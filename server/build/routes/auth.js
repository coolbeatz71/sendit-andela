'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _auth = require('../controllers/auth');

var _auth2 = _interopRequireDefault(_auth);

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
router.post('/login', _auth2.default.userSignIn);

exports.default = router;