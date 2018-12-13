'use strict';

// get HTML elements
var tableInfo = document.querySelector('#info');

// get the query string
var queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);
var params = queryString.split('&');
var parcelId = params.toString().split('=')[1];

// get the parcel details for a user
window.addEventListener('load', function () {
  if (!Number.isInteger(parseInt(parcelId, 10))) {
    swal('Oops!!', 'The parcel id must be a number', 'error');
  } else {
    var parcel = new Parcel();
    parcelId = parseInt(parcelId, 10);

    parcel.getParcelById(parcelId).then(function (result) {
      if (result.status === 'success') {
        tableInfo.innerHTML += '\n            <tr>\n              <th>Id N\xB0</th>\n              <td>' + result.parcel[0].id_parcel + '</td>\n            </tr>\n            <tr>\n              <th>Name</th>\n              <td>' + result.parcel[0].parcel_name + '</td>\n            </tr>\n            <tr>\n              <th>Description</th>\n              <td>' + result.parcel[0].description + '</td>\n            </tr>\n            <tr>\n              <th>Location</th>\n              <td>' + result.parcel[0].pickup_location + '</td>\n            </tr>\n            <tr>\n              <th>Destination</th>\n              <td>' + result.parcel[0].destination + '</td>\n            </tr>\n            <tr>\n              <th>Present Location</th>\n              <td>' + result.parcel[0].present_location + '</td>\n            </tr>\n            <tr>\n              <th>Weight</th>\n              <td>' + result.parcel[0].weight + ' Kg</td>\n            </tr>\n            <tr>\n              <th>Price</th>\n              <td>' + result.parcel[0].price + ' Rwf</td>\n            </tr>\n          ';
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