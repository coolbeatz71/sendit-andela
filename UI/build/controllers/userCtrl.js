'use strict';

var btnSignIn = document.getElementById('btn-sign-in');
var btnSignUp = document.getElementById('btn-sign-up');

// Event on user signIn
btnSignIn.addEventListener('click', function (e) {
  e.preventDefault();
  var email = document.getElementById('emailSignIn').value.trim();
  var password = document.getElementById('passwordSignIn').value.trim();

  if (!email) {
    swal('Require field', 'The email address must not be empty!', 'error');
  } else if (!password) {
    swal('Require field', 'The password must not be empty!', 'error');
  } else if (!validator.isEmail(email)) {
    swal('Oops!!', 'Invalid email format', 'error');
    email = '';
  } else if (!validator.isAlphanumeric(password)) {
    swal('Oops!!', 'The password must contains alphabetic or numeric symbols', 'error');
    password = '';
  } else {
    // send a POST request to the server
    var user = new User();
    user.signIn(email, password).then(function (result) {
      if (result.status === 'success') {
        window.location.href = 'userProfile.html';
      } else if (result.status === 'fail') {
        swal('Oops!!', '' + result.message, 'error');
        email = '';
        password = '';
      } else {
        swal('Oops!!', 'Internal server error', 'error');
        email = '';
        password = '';
      }
    });
  }
});

// Event on user signUp
btnSignUp.addEventListener('click', function (e) {
  e.preventDefault();

  var firstName = document.getElementById('firstName').value.trim();
  var lastName = document.getElementById('lastName').value.trim();
  var email = document.getElementById('emailSignUp').value.trim();
  var password = document.getElementById('passwordSignUp').value.trim();

  if (!firstName) {
    swal('Require field', 'The first name must not be empty!', 'error');
  } else if (!validator.isAlpha(firstName)) {
    swal('Require field', 'The first name must only contain alphabetic symbols', 'error');
    firstName = '';
  } else if (!lastName) {
    swal('Require field', 'The last name must not be empty!', 'error');
  } else if (!validator.isAlpha(lastName)) {
    swal('Require field', 'The last name must only contain alphabetic symbols', 'error');
    lastName = '';
  } else if (!email) {
    swal('Require field', 'The email address must not be empty!', 'error');
  } else if (!password) {
    swal('Require field', 'The password must not be empty!', 'error');
  } else if (!validator.isEmail(email)) {
    swal('Oops!!', 'Invalid email format', 'error');
    email = '';
  } else if (!validator.isAlphanumeric(password)) {
    swal('Oops!!', 'The password must contains alphabetic or numeric symbols', 'error');
    password = '';
  } else {
    // send a POST request to the server
    var user = new User();
    user.signUp(firstName, lastName, email, password).then(function (result) {
      console.log(result);
      if (result.status === 'success') {
        window.location.href = 'userProfile.html';
      } else if (result.status === 'fail') {
        swal('Oops!!', '' + result.message, 'error');
        firstName = '';
        lastName = '';
        email = '';
        password = '';
      } else {
        swal('Oops!!', 'Internal server error', 'error');
        firstName = '';
        lastName = '';
        email = '';
        password = '';
      }
    });
  }
});