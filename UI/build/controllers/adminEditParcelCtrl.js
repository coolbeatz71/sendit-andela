'use strict';

var btnEditLocation = document.querySelector('#btn-edit-location');
var btnEditStatus = document.querySelector('#btn-edit-status');

// event to edit present location
btnEditLocation.addEventListener(function (e) {
  e.preventDefault();
  var presentLocation = document.querySelector('#from').value;

  if (!presentLocation) {
    swal('Oops!!', 'The present location is required', 'error');
  } else {}
});

// event to edit parcel status
btnEditStatus.addEventListener(function (e) {
  e.preventDefault();
  var newStatus = document.querySelector('#status').value;

  if (!newStatus) {
    swal('Oops!!', 'The new status is required', 'error');
  } else {}
});