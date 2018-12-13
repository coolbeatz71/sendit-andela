'use strict';

// get HTML element
var btnEditParcel = document.querySelector('#btn-save');

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
  } else {}
});