/* eslint-disable */
import chai from 'chai';
import constants from './../models/constant';
import { execute } from './../models/db';

// importing models
import Parcel from './../models/parcel';
import User from './../models/user';
import Admin from './../models/admin';
import App from './../models/app';

// import controllers
import AdminCtrl from './../controllers/admin';
import AuthCtrl from './../controllers/auth';
import ParcelCtrl from './../controllers/parcel';
import UserCtrl from './../controllers/user';

const { expect, assert } = chai;
const should = chai.should();

// clear all table
before(async () => {
  try {
    await execute('TRUNCATE admin CASCADE; ALTER SEQUENCE admin_id_admin_seq RESTART WITH 1;');
    await execute('TRUNCATE users CASCADE; ALTER SEQUENCE users_id_user_seq RESTART WITH 1;');
    await execute('TRUNCATE parcels CASCADE; ALTER SEQUENCE parcels_id_parcel_seq RESTART WITH 1;');
  } catch (error) {
    console.log(error);
  }
});

describe('Testing methods[function] for AdminCtrl', () => {
  it('should be a function', async () => {
    await AdminCtrl.adminSignIn.should.be.a('function');
    await AdminCtrl.getAllParcels.should.be.a('function');
    await AdminCtrl.editStatus.should.be.a('function');
    await AdminCtrl.editPresentLocation.should.be.a('function');
    await AdminCtrl.countParcels.should.be.a('function');
  });
});

describe('Testing methods[function] for AuthCtrl', () => {
  it('should be a function', async () => {
    await AuthCtrl.userSignIn.should.be.a('function');
    await AuthCtrl.userSignUp.should.be.a('function');
  });
});

describe('Testing methods[function] for ParcelCtrl', () => {
  it('should be a function', async () => {
    await ParcelCtrl.createParcel.should.be.a('function');
    await ParcelCtrl.getParcelById.should.be.a('function');
    await ParcelCtrl.cancelParcel.should.be.a('function');
    await ParcelCtrl.editDestination.should.be.a('function');
  });
});

