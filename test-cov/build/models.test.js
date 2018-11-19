'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _parcel = require('../models/parcel');

var _parcel2 = _interopRequireDefault(_parcel);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _admin = require('../models/admin');

var _admin2 = _interopRequireDefault(_admin);

var _app = require('../models/app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// importing models
/* eslint-disable */
var expect = _chai2.default.expect,
    assert = _chai2.default.assert;


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

//////////////////////////////////////
// Testing params for each classes  //
//////////////////////////////////////

describe('#### Testing params of each functions in classes without params', function () {
  describe('Admin class', function () {
    it('should return undefined', function () {
      expect(admin.getAdmin()).to.be.undefined;
    });

    it('should return undefined', function () {
      expect(admin.getAdminIdByEmail()).to.be.undefined;
    });

    it('should return false', function () {
      expect(admin.isTokenValid()).to.be.false;
    });

    it('should return false', function () {
      expect(admin.getAdminIdByToken()).to.be.false;
    });

    it('should return false', function () {
      expect(admin.editParcel()).to.be.false;
    });

    it('should return a number', function () {
      expect(admin.getParcelNumber()).to.be.a('number');
    });
  });

  describe('App class', function () {
    it('should throw an error or Exception', function () {
      expect(app.readDataFile).to.throw();
    });

    it('should throw an error or Exception', function () {
      expect(app.writeDataFile).to.throw();
    });
  });

  describe('Parcel class', function () {
    it('should return false', function () {
      expect(parcel.createParcel()).to.be.false;
    });

    it('should return an array', function () {
      expect(parcel.getAllParcel()).to.be.an('array');
    });

    it('should return NULL', function () {
      expect(parcel.getAllParcelByUser()).to.be.null;
    });

    it('should return NaN', function () {
      expect(parcel.getParcelPrice()).to.be.NaN;
    });

    it('should return a number', function () {
      parcel.setOrderId();
      expect(parcel.getOrderId()).to.be.a('string');
    });
  });

  describe('User class', function () {
    it('should return NULL', function () {
      expect(user.createUser()).to.be.null;
    });

    it('should return undefined', function () {
      expect(user.getUser()).to.be.undefined;
    });

    it('should return undefined', function () {
      expect(user.getUserIdByEmail()).to.be.undefined;
    });

    it('should return a number', function () {
      user.setUserId();
      expect(user.getUserId()).to.be.a('string');
    });

    it('should return false', function () {
      expect(user.isTokenValid()).to.be.false;
    });

    it('should return false', function () {
      expect(user.getUserIdByToken()).to.be.false;
    });

    it('should return false', function () {
      expect(user.getEncryptedToken()).to.be.false;
    });

    it('should return NULL', function () {
      expect(user.editParcelDestination()).to.be.null;
    });

    it('should return NULL', function () {
      expect(user.cancelParcel()).to.be.null;
    });
  });
});

// //////////////////////////////////
// Testing instance of classes     //
// //////////////////////////////////
describe("#### Test instance of Each Class", function () {
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

//testing length of getUserId
describe('#### length of the getUserId()', function () {
  it('should have length of 3', function () {
    user.setUserId();
    var userId = user.getUserId();
    expect(userId).to.have.lengthOf(3);
  });
});

describe('#### Testing methods[function] for User class', function () {
  it('should be a function', function () {
    user.createUser.should.be.a('function');
    user.getUser.should.be.a('function');
    user.getUserIdByEmail.should.be.a('function');
    user.setUserId.should.be.a('function');
    user.getUserId.should.be.a('function');
    user.isTokenValid.should.be.a('function');
    user.getUserIdByToken.should.be.a('function');
    user.getEncryptedToken.should.be.a('function');
    user.editParcelDestination.should.be.a('function');
    user.cancelParcel.should.be.a('function');
    user.getParcelNumber.should.be.a('function');
  });
});

describe('#### Testing methods[function] for Admin class', function () {
  it('should be a function', function () {
    admin.getAdmin.should.be.a('function');
    admin.getAdminIdByEmail.should.be.a('function');
    admin.isTokenValid.should.be.a('function');
    admin.getAdminIdByToken.should.be.a('function');
    admin.editParcel.should.be.a('function');
  });
});

describe('#### Testing methods[function] for Admin class', function () {
  it('should be a function', function () {
    admin.getParcelNumber.should.be.a('function');
  });
});

describe('#### Testing methods[function] for User class', function () {
  it('should be a function', function () {
    user.getParcelNumber.should.be.a('function');
  });
});

describe('#### Testing methods[function] for App class', function () {
  it('should be a function', function () {
    app.readDataFile.should.be.a('function');
    app.writeDataFile.should.be.a('function');
  });
});

describe('#### Testing methods[function] for Parcel class', function () {
  it('should be a function', function () {
    parcel.createParcel.should.be.a('function');
    parcel.getAllParcel.should.be.a('function');
    parcel.getAllParcelByUser.should.be.a('function');
    parcel.getParcelPrice.should.be.a('function');
    parcel.setOrderId.should.be.a('function');
    parcel.getOrderId.should.be.a('function');
  });
});

// //////////////////////////////////
// Testing models concerning user  //
// //////////////////////////////////
describe('##### User class', function () {
  // Testing user creation
  describe('#### Testing user account creation', function () {
    describe('# when email already exist', function () {
      it('should return false', function () {
        var firstName = 'whatever';
        var lastName = 'whatever';
        var email = 'sigmacool@gmail.com';
        var password = 'whatever';

        var createUser = user.createUser(firstName, lastName, email, password);
        expect(createUser).to.be.false;
      });
    });
  });

  // Testing getUser
  describe('#### Testing get user methods', function () {
    describe('# When email and password dont exist', function () {
      var email = 'whatever';
      var password = 'whatever';

      it('should return undefined', function () {
        var getUser = user.getUser(email, password);
        expect(getUser).to.be.an('undefined');
      });
    });

    describe('# When email and password exist', function () {
      var email = 'sigmacool@gmail.com';
      var password = '12345678';

      it('should return object', function () {
        var getUser = user.getUser(email, password);
        expect(getUser).to.be.an('object');
      });
    });
  });

  // Testing getUserIdByEmail
  describe('#### Testing get userId by email methods', function () {
    describe('# When the email dont exist', function () {
      var email = 'whatever';

      it('should return undefined', function () {
        var getId = user.getUserIdByEmail(email);
        expect(getId).to.be.an('undefined');
      });
    });

    describe('# When the email exist', function () {
      var email = 'sigmacool@gmail.com';

      it('should return a string', function () {
        var getId = user.getUserIdByEmail(email);
        expect(getId).to.be.a('string');
      });
    });
  });

  describe('#### Testing IsTokenValid method', function () {
    it('should return boolean', function () {
      var isTokenValid = user.isTokenValid('whatever');
      assert.isBoolean(isTokenValid);
    });
  });

  describe('#### Testing getUserIdByToken method', function () {
    it('should return some value', function () {
      var isTokenValid = user.getUserIdByToken('authkey');
      assert.isNotNull(isTokenValid);
    });
  });

  describe('#### Testing getEncryptedToken method', function () {
    it('should return a string', function () {
      var encryptedToken = user.getEncryptedToken('myEmail');
      expect(encryptedToken).to.be.a('string');
    });
  });

  describe('#### Testing getParcelNumber method', function () {
    describe('# When the status is undefined', function () {
      var userId = '001';
      var status = undefined;
      it('should return Number', function () {
        var parcelNumber = user.getParcelNumber(userId, status);
        assert.isNumber(parcelNumber);
      });
    });

    describe('# When the status is delivered', function () {
      var userId = '001';
      var status = 'delivered';
      it('should return Number', function () {
        var parcelNumber = user.getParcelNumber(userId, status);
        assert.isNumber(parcelNumber);
      });
    });

    describe('# When the status is in transit', function () {
      var userId = '001';
      var status = 'in transit';
      it('should return Number', function () {
        var parcelNumber = user.getParcelNumber(userId, status);
        assert.isNumber(parcelNumber);
      });
    });

    describe('# When the status is cancelled', function () {
      var userId = '001';
      var status = 'cancelled';
      it('should return Number', function () {
        var parcelNumber = user.getParcelNumber(userId, status);
        assert.isNumber(parcelNumber);
      });
    });
  });
});

// ////////////////////////////////////
// Testing models concerning Parcel //
// ////////////////////////////////////
describe('##### Parcel class', function () {
  // Testing get all parcels
  describe('# get all parcel delivery order', function () {
    it('should return an array', function () {
      var allParcel = parcel.getAllParcel();
      assert.isArray(allParcel);
    });
  });

  // Testing get all parcels for a specific user
  describe('# get all for parcel delivery order for a specific user', function () {
    it('should return an array', function () {
      var allParcel = parcel.getAllParcelByUser('011');
      assert.isNull(allParcel);
    });
  });

  // Testing get parcel order price
  describe('# get price for a parcel by its weight', function () {
    it('should return a number', function () {
      var price = parcel.getParcelPrice('500');
      assert.isNumber(price);
    });
  });
});

// ////////////////////////////////////
// Testing models concerning Admin  //
// ////////////////////////////////////
describe('##### Admin class', function () {
  // Testing get admin
  describe('# When email and password dont exist', function () {
    var email = 'whatever';
    var password = 'whatever';

    it('should return undefined', function () {
      var getAdmin = admin.getAdmin(email, password);
      expect(getAdmin).to.be.an('undefined');
    });
  });

  // Testing get admin id by email
  describe('# get admin Id by email', function () {
    var email = 'whatever';

    it('should return undefined', function () {
      var getAdmin = admin.getAdminIdByEmail(email);
      expect(getAdmin).to.be.an('undefined');
    });
  });

  describe('# Testing IsTokenValid method', function () {
    it('should return boolean', function () {
      var isTokenValid = admin.isTokenValid('whatever');
      assert.isBoolean(isTokenValid);
    });
  });

  describe('# Testing getAdminIdByToken method', function () {
    it('should return some value', function () {
      var isTokenValid = admin.getAdminIdByToken('authkey');
      assert.isNotNull(isTokenValid);
    });
  });
});

// ////////////////////////////////////////////////////////
// Testing models concerning App (read & write on file)  //
// ////////////////////////////////////////////////////////
describe('#### Testing App Model', function () {
  var userFilePath = _path2.default.resolve(__dirname, '../../files/users.json');
  var adminFilePath = _path2.default.resolve(__dirname, '../../files/admin.json');
  var parcelFilePath = _path2.default.resolve(__dirname, '../../files/parcels.json');

  describe('# Reading file method For userFileData', function () {
    it('should return an array or object', function () {
      var userFile = app.readDataFile(userFilePath);
      assert.isOk(userFile);
    });
  });

  describe('# Reading file method For parcelFileData', function () {
    it('should return an array or object', function () {
      var parcelFile = app.readDataFile(parcelFilePath);
      assert.isOk(parcelFile);
    });
  });

  describe('# Reading file method For adminFileData', function () {
    it('should return an array or object', function () {
      var adminFile = app.readDataFile(adminFilePath);
      assert.isOk(adminFile);
    });
  });
});

describe('#### Testing property of object', function () {
  describe('# userInfo object', function () {
    it('should have some property ', function () {
      expect(userInfo).to.have.property('firstName');
      expect(userInfo).to.have.property('lastName');
      expect(userInfo).to.have.property('email');
      expect(userInfo).to.have.property('password');
    });
  });
});