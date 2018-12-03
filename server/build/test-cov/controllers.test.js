'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _constant = require('./../models/constant');

var _constant2 = _interopRequireDefault(_constant);

var _db = require('./../models/db');

var _parcel = require('./../models/parcel');

var _parcel2 = _interopRequireDefault(_parcel);

var _user = require('./../models/user');

var _user2 = _interopRequireDefault(_user);

var _admin = require('./../models/admin');

var _admin2 = _interopRequireDefault(_admin);

var _app = require('./../models/app');

var _app2 = _interopRequireDefault(_app);

var _admin3 = require('./../controllers/admin');

var _admin4 = _interopRequireDefault(_admin3);

var _auth = require('./../controllers/auth');

var _auth2 = _interopRequireDefault(_auth);

var _parcel3 = require('./../controllers/parcel');

var _parcel4 = _interopRequireDefault(_parcel3);

var _user3 = require('./../controllers/user');

var _user4 = _interopRequireDefault(_user3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import controllers


// importing models
var expect = _chai2.default.expect,
    assert = _chai2.default.assert; /* eslint-disable */

var should = _chai2.default.should();

// clear all table
before(async function () {
  try {
    await (0, _db.execute)('TRUNCATE admin CASCADE; ALTER SEQUENCE admin_id_admin_seq RESTART WITH 1;');
    await (0, _db.execute)('TRUNCATE users CASCADE; ALTER SEQUENCE users_id_user_seq RESTART WITH 1;');
    await (0, _db.execute)('TRUNCATE parcels CASCADE; ALTER SEQUENCE parcels_id_parcel_seq RESTART WITH 1;');
  } catch (error) {
    console.log(error);
  }
});

describe('Testing methods[function] for AdminCtrl', function () {
  it('should be a function', async function () {
    await _admin4.default.adminSignIn.should.be.a('function');
    await _admin4.default.getAllParcels.should.be.a('function');
    await _admin4.default.editStatus.should.be.a('function');
    await _admin4.default.editPresentLocation.should.be.a('function');
    await _admin4.default.countParcels.should.be.a('function');
  });
});

describe('Testing methods[function] for AuthCtrl', function () {
  it('should be a function', async function () {
    await _auth2.default.userSignIn.should.be.a('function');
    await _auth2.default.userSignUp.should.be.a('function');
  });
});

describe('Testing methods[function] for ParcelCtrl', function () {
  it('should be a function', async function () {
    await _parcel4.default.createParcel.should.be.a('function');
    await _parcel4.default.getParcelById.should.be.a('function');
    await _parcel4.default.cancelParcel.should.be.a('function');
    await _parcel4.default.editDestination.should.be.a('function');
  });
});