'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _user = require('./../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect,
    assert = _chai2.default.assert;
// importing models
/* eslint-disable */

var should = _chai2.default.should();

var user = new _user2.default();

var userInfo = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
};

//////////////////////////////////////
// Testing params for each classes  //
//////////////////////////////////////

describe('Testing params of each functions in classes without params', function () {

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
describe(" Test instance of Each Class", function () {
  it('should be an instance of User', function () {
    expect(user).to.be.an.instanceof(_user2.default);
  });
});

//testing length of getUserId
describe(' length of the getUserId()', function () {
  it('should have length of 3', function () {
    user.setUserId();
    var userId = user.getUserId();
    expect(userId).to.have.lengthOf(3);
  });
});

describe(' Testing methods[function] for User class', function () {
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

// //////////////////////////////////
// Testing models concerning user  //
// //////////////////////////////////
describe('User class', function () {
  // Testing user creation
  describe('Testing user account creation', function () {
    describe('when email already exist', function () {
      it('Should return false', function () {
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
  describe('Testing get user methods', function () {
    describe('When email and password dont exist', function () {
      var email = 'whatever';
      var password = 'whatever';

      it('should return undefined', function () {
        var getUser = user.getUser(email, password);
        expect(getUser).to.be.an('undefined');
      });
    });

    describe(' When email and password exist', function () {
      var email = 'sigmacool@gmail.com';
      var password = '12345678';

      it('should return object', function () {
        var getUser = user.getUser(email, password);
        expect(getUser).to.be.an('object');
      });
    });
  });

  // Testing getUserIdByEmail
  describe(' Testing get userId by email methods', function () {
    describe(' When the email dont exist', function () {
      var email = 'whatever';

      it('should return undefined', function () {
        var getId = user.getUserIdByEmail(email);
        expect(getId).to.be.an('undefined');
      });
    });

    describe(' When the email exist', function () {
      var email = 'sigmacool@gmail.com';

      it('should return a string', function () {
        var getId = user.getUserIdByEmail(email);
        expect(getId).to.be.a('string');
      });
    });
  });

  describe(' Testing IsTokenValid method', function () {
    it('should return boolean', function () {
      var isTokenValid = user.isTokenValid('whatever');
      assert.isBoolean(isTokenValid);
    });
  });

  describe(' Testing getUserIdByToken method', function () {
    it('should return some value', function () {
      var isTokenValid = user.getUserIdByToken('authkey');
      assert.isNotNull(isTokenValid);
    });
  });

  describe(' Testing getEncryptedToken method', function () {
    it('should return a string', function () {
      var encryptedToken = user.getEncryptedToken('myEmail');
      expect(encryptedToken).to.be.a('string');
    });
  });

  describe(' Testing getParcelNumber method', function () {
    describe(' When the status is undefined', function () {
      var userId = '001';
      var status = undefined;
      it('should return Number', function () {
        var parcelNumber = user.getParcelNumber(userId, status);
        assert.isNumber(parcelNumber);
      });
    });

    describe(' When the status is delivered', function () {
      var userId = '001';
      var status = 'delivered';
      it('should return Number', function () {
        var parcelNumber = user.getParcelNumber(userId, status);
        assert.isNumber(parcelNumber);
      });
    });

    describe(' When the status is in transit', function () {
      var userId = '001';
      var status = 'in transit';
      it('should return Number', function () {
        var parcelNumber = user.getParcelNumber(userId, status);
        assert.isNumber(parcelNumber);
      });
    });

    describe(' When the status is cancelled', function () {
      var userId = '001';
      var status = 'cancelled';
      it('should return Number', function () {
        var parcelNumber = user.getParcelNumber(userId, status);
        assert.isNumber(parcelNumber);
      });
    });
  });
});