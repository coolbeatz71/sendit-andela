// /* eslint-disable */
// import chai from 'chai';
// import path from 'path';

// // importing models
// import Parcel from './../models/parcel';
// import User from './../models/user';
// import Admin from './../models/admin';
// import App from './../models/app';
// import constants from './../models/constant';

// const { expect, assert } = chai;
// const should = chai.should();

// const user = new User();
// const parcel = new Parcel();
// const admin = new Admin();
// const app = new App();

// const userInfo = {
//   firstName: '',
//   lastName: '',
//   email: '',
//   password: '',
// };

// //////////////////////////////////////
// // Testing params for each classes  //
// //////////////////////////////////////

// describe('Testing params of each functions in classes without params', () => {
//   describe('Admin class', () => {
//     it('should return a constant', async () => {
//       expect(await admin.loginAdmin()).to.be.a('number');
//     });

//     it('should return null', async () => {
//       expect(await admin.editParcelStatus()).to.be.null;
//     });

//     it('should return false', async () => {
//       expect(await admin.editParcelStatus('1', constants.DEFAULT_STATUS.cancelled)).to.be.undefined;
//     });

//     it('should return null', async () => {
//       expect(await admin.editPresentLocation()).to.be.null;
//     });

//     it('should return number', async () => {
//       expect(await admin.getParcelNumber()).to.be.a('number');
//     });

//     it('should return a number', async () => {
//       expect(await admin.getParcelNumber(constants.DEFAULT_STATUS.pending)).to.be.a('number');
//     });

//     it('should return a number', async () => {
//       expect(await admin.getParcelNumber(constants.DEFAULT_STATUS.transit)).to.be.a('number');
//     });
//   });

//   describe('Parcel class', () => {
//     it('should return false', async () => {
//       expect(await parcel.createParcel()).to.be.false;
//     });

//     it('should return NaN', () => {
//       expect(parcel.getParcelPrice()).to.be.NaN;
//     });
//   });
// });

// // //////////////////////////////////
// // Testing instance of classes     //
// // //////////////////////////////////
// describe('Test instance of Each Class', () => {
//   it('should be an instance of User', () => {
//     expect(user).to.be.an.instanceof(User);
//   });

//   it('should be an instance of Parcel', () => {
//     expect(parcel).to.be.an.instanceof(Parcel);
//   });

//   it('should be an instance of Admin', () => {
//     expect(admin).to.be.an.instanceof(Admin);
//   });
// });

// describe('Testing methods[function] for User class', () => {
//   it('should be a function', async () => {
//     await user.createUser.should.be.a('function');
//     await user.loginUser.should.be.a('function');
//     await user.editParcelDestination.should.be.a('function');
//     await user.cancelParcel.should.be.a('function');
//     await user.getParcelNumber.should.be.a('function');
//   });
// });

// describe('Testing methods[function] for Admin class', () => {
//   it('should be a function', async () => {
//     await admin.loginAdmin.should.be.a('function');
//     await admin.getParcelNumber.should.be.a('function');
//     await admin.editParcelStatus.should.be.a('function');
//     await admin.editPresentLocation.should.be.a('function');
//   });
// });

// describe('Testing property of object', () => {
//   describe('userInfo object', () => {
//     it('should have some property ', () => {
//       expect(userInfo).to.have.property('firstName');
//       expect(userInfo).to.have.property('lastName');
//       expect(userInfo).to.have.property('email');
//       expect(userInfo).to.have.property('password');
//     });
//   });
// });

// describe('Testing methods[function] for Admin class', () => {
//   it('should be a function', async () => {
//     await admin.getParcelNumber.should.be.a('function');
//   });
// });

// describe('Testing methods[function] for User class', () => {
//   it('should be a function', async () => {
//     await user.getParcelNumber.should.be.a('function');
//   });
// });

// describe('Testing methods[function] for Parcel class', () => {
//   it('should be a function', async () => {
//     await parcel.createParcel.should.be.a('function');
//     await parcel.getAllParcel.should.be.a('function');
//     await parcel.getAllParcelByUser.should.be.a('function');
//     await parcel.getParcelById.should.be.a('function');
//     parcel.getParcelPrice.should.be.a('function');

//   });
// });

// describe('Testing methods[function] for App class', () => {
//   it('should be a function', async () => {
//     await app.isEmailExist.should.be.a('function');
//     await app.getIdByEmail.should.be.a('function');
//     await app.getInfoById.should.be.a('function');
//   });
// });
