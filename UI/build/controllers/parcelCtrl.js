'use strict';

var parcelNumber = document.querySelector('.parcel-number');
var tableAllParcels = document.querySelector('#table-all-parcel');
var tablePendingParcel = document.querySelector('#table-pending-parcel');
var tableDeliveredParcel = document.querySelector('#table-delivered-parcel');
var tableTransitParcel = document.querySelector('#table-transit-parcel');
var tableCancelledParcel = document.querySelector('#table-cancelled-parcel');

// create parcel
var btnSendOrder = document.querySelector('#btn-send-order');
var inputWeight = document.getElementById('weight');
var inputPrice = document.getElementById('price');

// retrieve parcel delivery orders list
window.addEventListener('load', function () {
  var parcel = new Parcel();

  // ////////////////////
  // Number of parcel //
  // ////////////////////
  parcel.countParcelByUser().then(function (result) {
    console.log(result);
    // Display the number of parcels per category
    if (result.status === 'success') {
      parcelNumber.innerHTML = '\n        <li class="numbers" id="all">All parcels: <span>' + result.parcel.all + '</span></li>\n        <li class="numbers" id="pending">Pending: <span>' + result.parcel.pending + '</span></li>\n        <li class="numbers" id="delivered">Delivered: <span>' + result.parcel.delivered + '</span></li>\n        <li class="numbers" id="transit">In transit: <span>' + result.parcel.inTransit + '</span></li>\n        <li class="numbers" id="cancelled">Cancelled: <span>' + result.parcel.cancelled + '</span></li>  \n      ';
    } else if (result.auth === 'missing') {
      swal('Not Authorized!!', 'Authentication key is required', 'error');
      window.location.href = 'index.html';
    } else if (result.auth === 'invalid') {
      swal('Not Authorized!!', 'Authentication key is invalid', 'error');
      window.location.href = 'index.html';
    }
  });

  // ///////////////////////
  // Display all parcels //
  // ///////////////////////
  parcel.getAllParcelByUser().then(function (result) {
    if (result.status === 'success') {
      if (result.parcel.length === 0) {
        tableAllParcels.innerHTML = '\n          <tr>\n            <td colspan=\'6\'>\n            <h3 class="no-data">Nothing to display</h3>  \n            </td>\n          </tr>\n      ';
      } else {
        var parcels = result.parcel;
        parcels.forEach(function (el) {
          tableAllParcels.innerHTML += '\n            <tr>\n              <td>' + el.id_parcel + '</td>\n              <td>' + el.parcel_name + '</td>\n              <td>' + el.pickup_location + '</td>\n              <td>' + el.destination + '</td>\n              <td>' + el.status + '</td>\n              <td>\n                  <div class="btn-group-action">\n                      <button data-id="' + el.id_parcel + '" id="btn-details">details</button>\n                      <button data-id="' + el.id_parcel + '" id="btn-edit">edit</button>\n                      <button data-id="' + el.id_parcel + '" id="btn-cancel">cancel</button>\n                  </div>\n              </td>\n          </tr>\n          ';
        });
      }
    } else if (result.auth === 'missing') {
      swal('Not Authorized!!', 'Authentication key is required', 'error');
      window.location.href = 'index.html';
    } else if (result.auth === 'invalid') {
      swal('Not Authorized!!', 'Authentication key is invalid', 'error');
      window.location.href = 'index.html';
    }
  });
});

btnSendOrder.addEventListener('click', function (e) {
  e.preventDefault();
  // create new parcel delivery order
  var parcelName = document.getElementById('parcelName').value.trim();
  var description = document.getElementById('desc').value.trim();
  var pickupLocation = document.getElementById('from').value.trim();
  var destination = document.getElementById('to').value.trim();
  var weight = inputWeight.value;
  var price = inputPrice.value;
  console.log(pickupLocation);

  if (!parcelName) {
    swal('Require field', 'The parcel name must not be empty!', 'error');
  } else if (!description) {
    swal('Require field', 'The parcel description must not be empty!', 'error');
  } else if (!pickupLocation) {
    swal('Require field', 'The pick up location must not be empty!', 'error');
  } else if (!destination) {
    swal('Require field', 'The destination must not be empty!', 'error');
  } else if (!weight) {
    swal('Require field', 'The weight must not be empty!', 'error');
  } else if (!validator.isNumeric(weight)) {
    swal('Require field', 'The weight must be a number!', 'error');
    weight = '';
  } else {
    var parcel = new Parcel();
    parcel.createParcel(parcelName, description, pickupLocation, destination, weight).then(function (result) {
      console.log(result);
      if (result.status === 'success') {
        swal('Success', 'Parcel created successfully', 'success').then(function (value) {
          window.location.href = 'userProfile.html';
        });
        parcelName = '';
        description = '';
        pickupLocation = '';
        destination = '';
        weight = '';
      } else if (result.status === 'fail') {
        swal('Oops!!', '' + result.message, 'error');
        parcelName = '';
        description = '';
        pickupLocation = '';
        destination = '';
        weight = '';
      } else {
        swal('Oops!!', 'Internal server error', 'error');
        parcelName = '';
        description = '';
        pickupLocation = '';
        destination = '';
        weight = '';
      }
    });
  }
});

// automatically calculate the price for the parcel
inputWeight.addEventListener('input', function () {
  var unitPrice = 500;
  inputPrice.value = inputWeight.value * unitPrice + ' Rwf';
});