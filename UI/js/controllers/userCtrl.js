let btnSignIn = document.getElementById('btn-sign-in');
let btnSignUp = document.getElementById('btn-sign-up');

// Event on user signIn
btnSignIn.addEventListener('click', (e) => {
  e.preventDefault();
  const email = document.getElementById('emailSignIn').value.trim();
  const password = document.getElementById('passwordSignIn').value.trim();

  if(!email){
    alert('The email address must not be empty');
  }else if (!password) {
    alert('The password must not be empty');
  }else {
    const user = new User();
    user.signIn(email, password)
    .then((result) => {
      if(!result.body.error){
        window.location.href ="userProfile.html";
      }else{        
        if(result.body.emptyParams){
          alert('Please, email and password are required');
        }else if(result.body.wrongParams) {
          alert('Incorrect email or password');
        }else {
          alert('Internal server error');
        }
      }
    });
  }
});

btnSignUp.addEventListener('click', (e) => {
  e.preventDefault();

  const firstName = document.getElementById('firstName').value.trim();
  const lastName  = document.getElementById('lastName').value.trim();
  const email     = document.getElementById('emailSignIn').value.trim();
  const password  = document.getElementById('passwordSignIn').value.trim();

  const user = new User();
  user.signUp(firstName, lastName, email, password)
  .then((result) =>{
    console.log(result);
    if(!result.body.error){
      window.location.href ="userProfile.html";
    }else{
      if(result.body.emptyParams){
        alert('Please, email and password are required');
      }else if(result.body.userExist) {
        alert('Thsi email already used by an account');
      }else {
        alert('Internal server error');
      }
    }
  });
});