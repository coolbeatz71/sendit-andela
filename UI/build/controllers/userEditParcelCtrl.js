'use strict';

// get HTML element
var btnEditParcel = document.querySelector('.btn-save');

// get the query string
var queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);
var params = queryString.split('&');
var parcelId = params.toString().split('=')[1];

btnEditParcel.addEventListener('click', function (e) {
  e.preventDefault();
  var newDestination = document.querySelector('#to').value;

  if (!newDestination) {
    swal('Oops', 'The new destination is required', 'error');
    newDestination = '';
  } else if (!Number.isInteger(parseInt(parcelId, 10))) {
    swal('Oops!!', 'The parcel id must be a number', 'error');
  } else {
    var parcel = new Parcel();
    parcelId = parseInt(parcelId, 10);

    parcel.editDestination(parcelId, newDestination.trim()).then(function (result) {
      if (result.status === 'success') {
        swal('Success', 'Destination successfully edited', 'success').then(function () {
          window.location.href = 'userProfile.html';
        });
      } else if (result.status === 'fail') {
        swal('Oops!!', '' + result.message, 'error');
      } else if (result.auth === 'missing') {
        swal('Not Authorized!!', 'Authentication key is required', 'error').then(function () {
          window.location.href = 'index.html';
        });
      } else if (result.auth === 'invalid') {
        swal('Not Authorized!!', 'Authentication key is invalid', 'error').then(function () {
          window.location.href = 'index.html';
        });
      }
    });
  }
});