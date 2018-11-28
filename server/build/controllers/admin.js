'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // importing models


var _admin = require('../models/admin');

var _admin2 = _interopRequireDefault(_admin);

var _constant = require('../models/constant');

var _constant2 = _interopRequireDefault(_constant);

var _parcel = require('../models/parcel');

var _parcel2 = _interopRequireDefault(_parcel);

var _app = require('../models/app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdminCtrl = function () {
  function AdminCtrl() {
    _classCallCheck(this, AdminCtrl);
  }

  _createClass(AdminCtrl, null, [{
    key: 'adminSignIn',

    /**
     * signIn the admin
     * @param  Request request
     * @param  Response response
     * @return object json
     */
    value: async function adminSignIn(request, response) {
      // get sign data from the request body
      var _request$body = request.body,
          email = _request$body.email,
          password = _request$body.password;


      if (!email || !password) {
        response.status(400).json({
          status: 'fail',
          message: 'Email and password are required'
        });
      }

      request.checkBody('email', 'email is required').notEmpty().trim().isEmail().withMessage('Invalid email format');
      request.checkBody('password', 'password is required').notEmpty().isAlphanumeric().trim().withMessage('The password must contains alphabetic or numeric symbols');

      var errors = request.validationErrors();

      if (errors) {
        response.status(400).json({
          status: 'fail',
          message: errors
        });
      } else {
        var admin = new _admin2.default();
        var login = await admin.loginAdmin(email, password);

        if (login === _constant2.default.INVALID_EMAIL) {
          response.status(404).json({
            status: 'fail',
            message: 'User not found, Incorrect email address'
          });
        } else if (login === _constant2.default.INVALID_PASSWORD) {
          response.status(404).json({
            status: 'fail',
            message: 'the password is incorrect'
          });
        } else {
          response.status(200).json({
            status: 'success',
            user: login
          });
        }
      }
    }

    /**
     * get All parcels for all users
     * @param  Request request
     * @param  Response response
     * @return object json
     */

  }, {
    key: 'getAllParcels',
    value: async function getAllParcels(request, response) {
      var email = response.locals.email;

      var app = new _app2.default();
      var isAdmin = await app.isEmailExist(email, _constant2.default.ADMIN);

      if (!isAdmin) {
        response.status(403).json({
          status: 'fail',
          message: 'Forbidden, Invalid admin authentication key'
        });
      } else {
        var parcel = new _parcel2.default();
        var getParcel = await parcel.getAllParcel();

        response.status(200).json({
          status: 'success',
          parcel: getParcel
        });
      }
    }

    /**
     * edit status of a particular parcel order
     * @param  Request request
     * @param  Response response
     * @return object json
     */

  }, {
    key: 'editStatus',
    value: async function editStatus(request, response) {
      var parcelId = request.params.parcelId;
      var status = request.body.status;
      var email = response.locals.email;


      var app = new _app2.default();
      var isAdmin = await app.isEmailExist(email, _constant2.default.ADMIN);

      if (!isAdmin) {
        response.status(403).json({
          status: 'fail',
          message: 'Forbidden, Invalid admin authentication key'
        });
      }

      request.check('parcelId', 'parcel id is required').notEmpty().isInt().withMessage('parcel id must be a number');

      request.checkBody('status', 'new status is required').notEmpty().isAlpha().withMessage('new status must only contains alphabetic sysmbols');

      var errors = request.validationErrors();

      if (errors) {
        response.status(400).json({
          status: 'fail',
          message: errors
        });
      } else {
        var admin = new _admin2.default();
        var edit = await admin.editParcelStatus(parcelId, status);

        if (edit === undefined) {
          response.status(401).json({
            status: 'fail',
            message: 'Not authorized to cancel parcel delievry order'
          });
        } else if (edit === null) {
          response.status(404).json({
            status: 'fail',
            message: 'No parcel order found with this id'
          });
        } else if (!edit) {
          response.status(401).json({
            status: 'fail',
            message: 'Not authorized to edit status of this parcel order'
          });
        } else {
          response.status(200).json({
            status: 'success',
            parcel: edit
          });
        }
      }
    }

    /**
     * edit present location of a particular parcel order
     * @param  Request request
     * @param  Response response
     * @return object json
     */

  }, {
    key: 'editPresentLocation',
    value: async function editPresentLocation(request, response) {
      var parcelId = request.params.parcelId;
      var presentLocation = request.body.presentLocation;
      var email = response.locals.email;


      var app = new _app2.default();
      var isAdmin = await app.isEmailExist(email, _constant2.default.ADMIN);

      if (!isAdmin) {
        response.status(403).json({
          status: 'fail',
          message: 'Forbidden, Invalid admin authentication key'
        });
      }

      request.check('parcelId', 'parcel id is required').notEmpty().isInt().withMessage('parcel id must be a number');

      request.checkBody('presentLocation', 'present location is required').notEmpty().isAlpha().withMessage('present location must only contains alphabetic sysmbols');

      var errors = request.validationErrors();

      if (errors) {
        response.status(400).json({
          status: 'fail',
          message: errors
        });
      } else {
        var admin = new _admin2.default();
        var edit = await admin.editPresentLocation(parcelId, presentLocation);

        if (edit === null) {
          response.status(404).json({
            status: 'fail',
            message: 'No parcel order found with this id'
          });
        } else if (!edit) {
          response.status(401).json({
            status: 'fail',
            message: 'Not authorized to edit present location of this parcel order'
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

  return AdminCtrl;
}();

exports.default = AdminCtrl;