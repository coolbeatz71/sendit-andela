const btnSignIn = document.getElementById('btn-sign-in');
const btnSignUp = document.getElementById('btn-sign-up');

// Event on user signIn
btnSignIn.addEventListener('click', (e) => {
  e.preventDefault();
  const email = document.getElementById('emailSignIn').value.trim();
  const password = document.getElementById('passwordSignIn').value.trim();

  if (!email) {
    swal('Require field', 'The email address must not be empty!', 'error');
  } else if (!password) {
    swal('Require field', 'The password must not be empty!', 'error');
  } else if (!validator.isEmail(email)) {
    swal('Oops!!', 'Invalid email format', 'error');
  } else if (!validator.isAlphanumeric(password)) {
    swal('Oops!!', 'The password must contains alphabetic or numeric symbols', 'error');
  } else {
    // send a POST request to the server
    const user = new User();
    user.signIn(email, password)
      .then((result) => {
        if (result.status === 'success') {
          window.location.href = 'userProfile.html';
        } else if (result.status === 'fail') {
          swal('Oops!!', `${result.message}`, 'error');
        } else {
          swal('Oops!!', 'Internal server error', 'error');
        }
      });
  }
});

// Event on user signUp
btnSignUp.addEventListener('click', (e) => {
  e.preventDefault();

  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('emailSignUp').value.trim();
  const password = document.getElementById('passwordSignUp').value.trim();

  if (!firstName) {
    swal('Require field', 'The first name must not be empty!', 'error');
  } else if (!validator.isAlpha(firstName)) {
    swal('Require field', 'The first name must only contain alphabetic symbols', 'error');
  } else if (!lastName) {
    swal('Require field', 'The last name must not be empty!', 'error');
  } else if (!validator.isAlpha(lastName)) {
    swal('Require field', 'The last name must only contain alphabetic symbols', 'error');
  } else if (!email) {
    swal('Require field', 'The email address must not be empty!', 'error');
  } else if (!password) {
    swal('Require field', 'The password must not be empty!', 'error');
  } else if (!validator.isEmail(email)) {
    swal('Oops!!', 'Invalid email format', 'error');
  } else if (!validator.isAlphanumeric(password)) {
    swal('Oops!!', 'The password must contains alphabetic or numeric symbols', 'error');
  } else {
    // send a POST request to the server
    const user = new User();
    user.signUp(firstName, lastName, email, password)
      .then((result) => {
        console.log(result);
        if (result.status === 'success') {
          window.location.href = 'userProfile.html';
        } else if (result.status === 'fail') {
          swal('Oops!!', `${result.message}`, 'error');
        } else {
          swal('Oops!!', 'Internal server error', 'error');
        }
      });
  }
});
