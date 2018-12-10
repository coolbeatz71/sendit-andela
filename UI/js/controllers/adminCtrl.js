const btnSignIn = document.getElementById('btn-sign-in-admin');

// Event on admin signIn
btnSignIn.addEventListener('click', (e) => {
  e.preventDefault();
  let email = document.getElementById('emailSignInAdmin').value.trim();
  let password = document.getElementById('passwordSignInAdmin').value.trim();

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
    const admin = new Admin();
    admin.signIn(email, password)
      .then((result) => {
        if (result.status === 'success') {
          window.location.href = 'adminProfile.html';
        } else if (result.status === 'fail') {
          swal('Oops!!', `${result.message}`, 'error');
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
