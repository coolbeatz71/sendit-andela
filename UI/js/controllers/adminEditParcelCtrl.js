const btnEditLocation = document.querySelector('#btn-edit-location');
const btnEditStatus = document.querySelector('#btn-edit-status');
const btnCancelEdit = document.querySelector('.btn-cancel');

// get the query string
let queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);
const params = queryString.split('&');
const parcelId = params.toString().split('=')[1];

// event to edit present location
btnEditLocation.addEventListener('click', (e) => {
  e.preventDefault();
  const presentLocation = document.querySelector('#from').value;

  if (!presentLocation) {
    swal('Oops!!', 'The present location is required', 'error');
  } else if (!Number.isInteger(parseInt(parcelId, 10))) {
    swal('Oops!!', 'The parcel id must be a number', 'error');
  } else {
    const parcel = new Parcel();

    parcel.editPresentLocation(parcelId, presentLocation)
      .then((result) => {
        if (result.status === 'success') {
          swal('Success', 'Present location edited successfully', 'success');
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

// event to edit parcel status
btnEditStatus.addEventListener('click', (e) => {
  e.preventDefault();
  const newStatus = document.querySelector('#status').value;

  if (!newStatus) {
    swal('Oops!!', 'The new status is required', 'error');
  } else if (!Number.isInteger(parseInt(parcelId, 10))) {
    swal('Oops!!', 'The parcel id must be a number', 'error');
  } else {
    const parcel = new Parcel();

    parcel.editStatus(parcelId, newStatus)
      .then((result) => {
        if (result.status === 'success') {
          swal('Success', 'Parcel status edited successfully', 'success');
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
      window.location.href = 'adminProfile.html';
    }
  });
});
