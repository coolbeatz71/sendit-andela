const btnEditLocation = document.querySelector('#btn-edit-location');
const btnEditStatus = document.querySelector('#btn-edit-status');

// event to edit present location
btnEditLocation.addEventListener((e) => {
  e.preventDefault();
  const presentLocation = document.querySelector('#from').value;

  if (!presentLocation) {
    swal('Oops!!', 'The present location is required', 'error');
  } else {

  }
});

// event to edit parcel status
btnEditStatus.addEventListener((e) => {
  e.preventDefault();
  const newStatus = document.querySelector('#status').value;

  if (!newStatus) {
    swal('Oops!!', 'The new status is required', 'error');
  } else {

  }
});
