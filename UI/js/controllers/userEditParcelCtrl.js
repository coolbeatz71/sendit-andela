// get HTML element
const btnEditParcel = document.querySelector('.btn-save');
const btnCancelEdit = document.querySelector('.btn-cancel');

// get the query string
let queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);
const params = queryString.split('&');
let parcelId = params.toString().split('=')[1];

btnEditParcel.addEventListener('click', (e) => {
  e.preventDefault();
  let newDestination = document.querySelector('#to').value;

  if (!newDestination) {
    swal('Oops', 'The new destination is required', 'error');
    newDestination = '';
  } else if (!Number.isInteger(parseInt(parcelId, 10))) {
    swal('Oops!!', 'The parcel id must be a number', 'error');
  } else {
    const parcel = new Parcel();
    parcelId = parseInt(parcelId, 10);

    parcel.editDestination(parcelId, newDestination.trim())
      .then((result) => {
        if (result.status === 'success') {
          swal('Success', 'Destination successfully edited', 'success')
            .then(() => {
              window.location.href = 'userProfile.html';
            });
        } else if (result.status === 'fail') {
          swal('Oops!!', `${result.message}`, 'error');
        } else if (result.auth === 'missing') {
          swal('Not Authorized!!', 'Authentication key is required', 'error')
            .then(() => {
              window.location.href = 'index.html';
            });
        } else if (result.auth === 'invalid') {
          swal('Not Authorized!!', 'Authentication key is invalid', 'error')
            .then(() => {
              window.location.href = 'index.html';
            });
        }
      });
  }
});

btnCancelEdit.addEventListener('click', (e) => {
  e.preventDefault();
  swal('Are you sure you want to do this?', {
    buttons: ['No', true],
  }).then((value) => {
    if (value) {
      window.location.href = 'userProfile.html';
    }
  });
});
