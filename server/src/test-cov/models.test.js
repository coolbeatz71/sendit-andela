/* eslint-disable */
import chai from 'chai';
import path from 'path';
// importing models
import User from './../models/user';
import Parcel from './../models/parcel';
import App from './../models/app';

const { expect, assert } = chai;
const should = chai.should();

const user = new User();
const parcel = new Parcel();
const app = new App(); 

const userInfo = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

//////////////////////////////////////
// Testing params for each classes  //
//////////////////////////////////////

describe('Testing params of each functions in classes without params', () => {

  describe('App class', () => {
    it('should throw an error or Exception', () => {
      expect(app.readDataFile).to.throw();
    });

    it('should throw an error or Exception', () => {
      expect(app.writeDataFile).to.throw();
    });
  });

  describe('Parcel class', () => {
    it('should return false', () => {
      expect(parcel.createParcel()).to.be.false;
    });

    it('should return an array', () => {
      expect(parcel.getAllParcel()).to.be.an('array');
    });

    it('should return NULL', () => {
      expect(parcel.getAllParcelByUser()).to.be.null;
    });

    it('should return NaN', () => {
      expect(parcel.getParcelPrice()).to.be.NaN;
    });

    it('should return a number', () => {
      parcel.setOrderId();
      expect(parcel.getOrderId()).to.be.a('string');
    });    
  });

  describe('User class', () => {
    it('should return NULL', () => {
      expect(user.createUser()).to.be.null;
    });

    it('should return undefined', () => {
      expect(user.getUser()).to.be.undefined;
    });

    it('should return undefined', () => {
      expect(user.getUserIdByEmail()).to.be.undefined;
    });

    it('should return a number', () => {
      user.setUserId();
      expect(user.getUserId()).to.be.a('string');
    }); 

    it('should return false', () => {
      expect(user.isTokenValid()).to.be.false;
    });

    it('should return false', () => {
      expect(user.getUserIdByToken()).to.be.false;
    });

    it('should return false', () => {
      expect(user.getEncryptedToken()).to.be.false;
    });

    it('should return NULL', () => {
      expect(user.editParcelDestination()).to.be.null;
    });

    it('should return NULL', () => {
      expect(user.cancelParcel()).to.be.null;
    });    
  });
});


// //////////////////////////////////
// Testing instance of classes     //
// //////////////////////////////////
describe(" Test instance of Each Class", () => {
  it('should be an instance of User', () => {
    expect(user).to.be.an.instanceof(User);
  });

  it('should be an instance of Parcel', () => {
    expect(parcel).to.be.an.instanceof(Parcel);
  });
});

//testing length of getUserId
describe(' length of the getUserId()', () => {
  it('should have length of 3', () => {
    user.setUserId();
    const userId = user.getUserId();
    expect(userId).to.have.lengthOf(3);
  });
});

describe(' Testing methods[function] for User class', () => {
  it('should be a function', () => {
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

describe('#### Testing methods[function] for User class', () => {
  it('should be a function', () => {
    user.getParcelNumber.should.be.a('function');
  });
});

describe('#### Testing methods[function] for App class', () => {
  it('should be a function', () => {
    app.readDataFile.should.be.a('function');
    app.writeDataFile.should.be.a('function');
  });
});

describe('#### Testing methods[function] for Parcel class', () => {
  it('should be a function', () => {
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
describe('##### User class', () => {
  // Testing user creation
  describe('#### Testing user account creation', () => {
    describe('# when email already exist', () => {
      it('should return false', () => {
        const firstName = 'whatever';
        const lastName = 'whatever';
        const email = 'sigmacool@gmail.com';
        const password = 'whatever';

        const createUser = user.createUser(firstName, lastName, email, password);
        expect(createUser).to.be.false;
      });
    });
  });

  // Testing getUser
  describe('#### Testing get user methods', () => {
    describe('# When email and password dont exist', () => {
      const email = 'whatever';
      const password = 'whatever';

      it('should return undefined', () => {
        const getUser = user.getUser(email, password);
        expect(getUser).to.be.an('undefined');
      });
    });

    describe('# When email and password exist', () => {
      const email = 'sigmacool@gmail.com';
      const password = '12345678';

      it('should return object', () => {
        const getUser = user.getUser(email, password);
        expect(getUser).to.be.an('object');
      });
    });
  });

  // Testing getUserIdByEmail
  describe('#### Testing get userId by email methods', () => {
    describe('# When the email dont exist', () => {
      const email = 'whatever';

      it('should return undefined', () => {
        const getId = user.getUserIdByEmail(email);
        expect(getId).to.be.an('undefined');
      });
    });

    describe('# When the email exist', () => {
      const email = 'sigmacool@gmail.com';

      it('should return a string', () => {
        const getId = user.getUserIdByEmail(email);
        expect(getId).to.be.a('string');
      });
    });
  });

  describe('#### Testing IsTokenValid method', () => {
    it('should return boolean', () => {
      const isTokenValid = user.isTokenValid('whatever');
      assert.isBoolean(isTokenValid);
    });
  });

  describe('#### Testing getUserIdByToken method', () => {
    it('should return some value', () => {
      const isTokenValid = user.getUserIdByToken('authkey');
      assert.isNotNull(isTokenValid);
    });
  });

  describe('#### Testing getEncryptedToken method', () => {
    it('should return a string', () => {
      const encryptedToken = user.getEncryptedToken('myEmail');
      expect(encryptedToken).to.be.a('string');
    });
  });

  describe('#### Testing getParcelNumber method', () => {
    describe('# When the status is undefined', () => {
      const userId = '001';
      const status = undefined;
      it('should return Number', () => {
        const parcelNumber = user.getParcelNumber(userId, status);
        assert.isNumber(parcelNumber);
      });
    });

    describe('# When the status is delivered', () => {
      const userId = '001';
      const status = 'delivered';
      it('should return Number', () => {
        const parcelNumber = user.getParcelNumber(userId, status);
        assert.isNumber(parcelNumber);
      });
    });

    describe('# When the status is in transit', () => {
      const userId = '001';
      const status = 'in transit';
      it('should return Number', () => {
        const parcelNumber = user.getParcelNumber(userId, status);
        assert.isNumber(parcelNumber);
      });
    });

    describe('# When the status is cancelled', () => {
      const userId = '001';
      const status = 'cancelled';
      it('should return Number', () => {
        const parcelNumber = user.getParcelNumber(userId, status);
        assert.isNumber(parcelNumber);
      });
    });
  });
});

// ////////////////////////////////////
// Testing models concerning Parcel //
// ////////////////////////////////////
describe('##### Parcel class', () => {
  // Testing get all parcels
  describe('# get all parcel delivery order', () => {
    it('should return an array', () => {
      const allParcel = parcel.getAllParcel();
      assert.isArray(allParcel);
    });
  });

  // Testing get all parcels for a specific user
  describe('# get all for parcel delivery order for a specific user', () => {
    it('should return an array', () => {
      const allParcel = parcel.getAllParcelByUser('011');
      assert.isNull(allParcel);
    });
  });

  // Testing get parcel order price
  describe('# get price for a parcel by its weight', () => {
    it('should return a number', () => {
      const price = parcel.getParcelPrice('500');
      assert.isNumber(price);
    });
  });
});