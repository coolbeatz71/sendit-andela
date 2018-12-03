'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _parcel = require('./../models/parcel');

var _parcel2 = _interopRequireDefault(_parcel);

var _user = require('./../models/user');

var _user2 = _interopRequireDefault(_user);

var _admin = require('./../models/admin');

var _admin2 = _interopRequireDefault(_admin);

var _app = require('./../models/app');

var _app2 = _interopRequireDefault(_app);

var _constant = require('./../models/constant');

var _constant2 = _interopRequireDefault(_constant);

var _db = require('./../models/db');

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

var user = new _user2.default();
var parcel = new _parcel2.default();
var admin = new _admin2.default();
var app = new _app2.default();

var userInfo = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
};

// clear all table
before(async function () {
  try {
    await (0, _db.execute)('TRUNCATE users CASCADE; ALTER SEQUENCE users_id_user_seq RESTART WITH 1;');
    await (0, _db.execute)('TRUNCATE parcels CASCADE; ALTER SEQUENCE parcels_id_parcel_seq RESTART WITH 1;');
  } catch (error) {
    console.log(error);
  }
});

//////////////////////////////////////
// Testing params for each classes  //
//////////////////////////////////////
describe('Testing params of each functions in classes without params', function () {
  describe('Admin class', function () {
    it('should return a string constant', async function () {
      expect((await admin.loginAdmin())).to.be.a('string');
    });

    it('should return a string constant', async function () {
      expect((await admin.editParcelStatus())).to.be.a('string');
    });

    it('should return a string constant', async function () {
      expect((await admin.editParcelStatus('1', _constant2.default.DEFAULT_STATUS.cancelled))).to.be.a('string');
    });

    it('should return a string constant', async function () {
      expect((await admin.editPresentLocation())).to.be.a('string');
    });

    it('should return number', async function () {
      expect((await admin.getParcelNumber())).to.be.a('number');
    });

    it('should return a number', async function () {
      expect((await admin.getParcelNumber(_constant2.default.DEFAULT_STATUS.pending))).to.be.a('number');
    });

    it('should return a number', async function () {
      expect((await admin.getParcelNumber(_constant2.default.DEFAULT_STATUS.transit))).to.be.a('number');
    });
  });

  describe('Parcel class', function () {
    it('should return false', async function () {
      expect((await parcel.createParcel())).to.be.false;
    });

    it('should return NaN', function () {
      expect(parcel.getParcelPrice()).to.be.NaN;
    });
  });
});

// //////////////////////////////////
// Testing instance of classes     //
// //////////////////////////////////
describe('Test instance of Each Class', function () {
  it('should be an instance of User', function () {
    expect(user).to.be.an.instanceof(_user2.default);
  });

  it('should be an instance of Parcel', function () {
    expect(parcel).to.be.an.instanceof(_parcel2.default);
  });

  it('should be an instance of Admin', function () {
    expect(admin).to.be.an.instanceof(_admin2.default);
  });
});

describe('Testing methods[function] for User class', function () {
  it('should be a function', async function () {
    await user.createUser.should.be.a('function');
    await user.loginUser.should.be.a('function');
    await user.editParcelDestination.should.be.a('function');
    await user.cancelParcel.should.be.a('function');
    await user.getParcelNumber.should.be.a('function');
  });
});

describe('Testing methods[function] for Admin class', function () {
  it('should be a function', async function () {
    await admin.loginAdmin.should.be.a('function');
    await admin.getParcelNumber.should.be.a('function');
    await admin.editParcelStatus.should.be.a('function');
    await admin.editPresentLocation.should.be.a('function');
  });
});

describe('Testing property of object', function () {
  describe('userInfo object', function () {
    it('should have some property ', function () {
      expect(userInfo).to.have.property('firstName');
      expect(userInfo).to.have.property('lastName');
      expect(userInfo).to.have.property('email');
      expect(userInfo).to.have.property('password');
    });
  });
});

describe('Testing methods[function] for Admin class', function () {
  it('should be a function', async function () {
    await admin.getParcelNumber.should.be.a('function');
  });
});

describe('Testing methods[function] for User class', function () {
  it('should be a function', async function () {
    await user.getParcelNumber.should.be.a('function');
  });
});

describe('Testing methods[function] for Parcel class', function () {
  it('should be a function', async function () {
    await parcel.createParcel.should.be.a('function');
    await parcel.getAllParcel.should.be.a('function');
    await parcel.getAllParcelByUser.should.be.a('function');
    await parcel.getParcelById.should.be.a('function');
    parcel.getParcelPrice.should.be.a('function');
  });
});

describe('Testing methods[function] for App class', function () {
  it('should be a function', async function () {
    await app.isEmailExist.should.be.a('function');
    await app.getIdByEmail.should.be.a('function');
    await app.getInfoById.should.be.a('function');
  });
});