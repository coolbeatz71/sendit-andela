/* eslint-disable */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const should = chai.should();
const { expect, assert } = chai;

const apiVersion = '/api/v1';

chai.use(chaiHttp);

// ///////////////////////////
// Test for users routes    //
// ///////////////////////////

// signUp the user when no data are sent
describe('/POST signUp user with empty argument', () => {
  const signUpData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };
  it('should POST user data (signUp)', (done) => {
    chai.request(app)
      .post(`${apiVersion}/user/signUp`)
      .send(signUpData)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe('/POST signUp user, Email already exist', () => {
  const signUpData = {
    firstName: 'whatever',
    lastName: 'whatever',
    email: 'sigmacool@gmail.com',
    password: '12345678',
  };
  it('should POST user data (signUp)', (done) => {
    chai.request(app)
      .post(`${apiVersion}/user/signUp`)
      .send(signUpData)
      .end((err, res) => {
        res.should.have.status(409);
        expect(res).to.be.json;
        done();
      });
  });
});

// signIn the user when no data are sent
describe('/POST signIn user with empty params', () => {
  const signInData = {
    email: '',
    password: '',
  };
  it('should POST user data (signIn)', (done) => {
    chai.request(app)
      .post(`${apiVersion}/user/signIn`)
      .send(signInData)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe('/POST signIn user with good params', () => {
  it('should POST user data (signIn)', (done) => {
    chai.request(app)
      .post(`${apiVersion}/user/signIn`)
      .send({
        email: 'sigmacool@gmail.com',
        password: '12345678'
      })
      .end((err, res) => {
        res.should.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
});

describe('/POST signIn user with wrong email params', () => {
  it('should POST user data (signIn)', (done) => {
    chai.request(app)
      .post(`${apiVersion}/user/signIn`)
      .send({
        email: 'sigmacoolwrong',
        password: '12345678'
      })
      .end((err, res) => {
        res.should.have.status(404);
        expect(res).to.be.json;
        done();
      });
  });
});
