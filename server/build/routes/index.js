'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _swaggerUiExpress = require('swagger-ui-express');

var _swaggerUiExpress2 = _interopRequireDefault(_swaggerUiExpress);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _parcel = require('./parcel');

var _parcel2 = _interopRequireDefault(_parcel);

var _admin = require('./admin');

var _admin2 = _interopRequireDefault(_admin);

var _apiDocsSwagger = require('../api-docs-swagger.json');

var _apiDocsSwagger2 = _interopRequireDefault(_apiDocsSwagger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/docs', _swaggerUiExpress2.default.serve, _swaggerUiExpress2.default.setup(_apiDocsSwagger2.default));
router.use('/auth', _auth2.default);
router.use('/users', _user2.default);
router.use('/parcels', _parcel2.default);
router.use('/admin', _admin2.default);

exports.default = router;