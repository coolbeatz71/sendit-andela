'use strict';

var btnSignIn = document.getElementById('btn-sign-in-admin');

// Event on user signIn
btnSignIn.addEventListener('click', function (e) {
  e.preventDefault();
  var email = document.getElementById('emailSignInAdmin').value.trim();
  var password = document.getElementById('passwordSignInAdmin').value.trim();

  if (!email) {
    alert('The email address must not be empty');
  } else if (!password) {
    alert('The password must not be empty');
  } else {
    var user = new User();
    user.signIn(email, password).then(function (result) {
      if (!result.body.error) {
        window.location.href = "userProfile.html";
      } else {
        if (result.body.emptyParams) {
          alert('Please, email and password are required');
        } else if (result.body.wrongParams) {
          alert('Incorrect email or password');
        } else {
          alert('Internal server error');
        }
      }
    });
  }
});

btnSignUp.addEventListener('click', function (e) {
  e.preventDefault();

  var firstName = document.getElementById('firstName').value.trim();
  var lastName = document.getElementById('lastName').value.trim();
  var email = document.getElementById('emailSignIn').value.trim();
  var password = document.getElementById('passwordSignIn').value.trim();

  var user = new User();
  user.signUp(firstName, lastName, email, password).then(function (result) {
    console.log(result);
    if (!result.body.error) {
      window.location.href = "userProfile.html";
    } else {
      if (result.body.emptyParams) {
        alert('Please, email and password are required');
      } else if (result.body.userExist) {
        alert('Thsi email already used by an account');
      } else {
        alert('Internal server error');
      }
    }
  });
});