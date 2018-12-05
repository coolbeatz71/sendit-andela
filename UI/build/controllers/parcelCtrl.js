'use strict';

var parcelNumber = document.querySelector('.parcel-number');
var tableAllParcels = document.querySelector('#table-all-parcel');
var tableDeliveredParcel = document.querySelector('#table-delivered-parcel');
var tableTransitParcel = document.querySelector('#table-transit-parcel');
var tableCancelledParcel = document.querySelector('#table-cancelled-parcel');

window.addEventListener('load', function () {
  var parcel = new Parcel();

  //////////////////////
  // Number of parcel //
  //////////////////////
  parcel.countParcelByUser().then(function (result) {
    console.log(result);
    // Display the number of parcels per category
    if (!result.body.error) {
      parcelNumber.innerHTML = '\n        <li class="numbers" id="all">All parcels: <span>' + result.body.data.all + '</span></li>\n        <li class="numbers" id="delivered">Delivered: <span>' + result.body.data.delivered + '</span></li>\n        <li class="numbers" id="transit">In transit: <span>' + result.body.data.inTransit + '</span></li>\n        <li class="numbers" id="cancelled">Cancelled: <span>' + result.body.data.cancelled + '</span></li>  \n      ';
    } else {
      if (result.body.authKeyMissed) {
        alert('Auth Missed');
        window.location.href = "index.html";
      } else if (result.body.authKeyInvalid) {
        alert('Auth Invalid');
        window.location.href = "index.html";
      }
    }
  });

  /////////////////////////
  // Display all parcels //
  /////////////////////////
  parcel.getAllParcelByUser().then(function (result) {
    if (!result.body.error) {
      if (!result.body.data) {
        tableAllParcels.innerHTML = '\n        <h3 class="no-data">Nothing to display</h3>  \n      ';
      } else {
        var parcels = result.body.data;
        parcels.forEach(function (el) {
          tableAllParcels.innerHTML += '\n            <tr>\n              <td>' + el.orderId + '</td>\n              <td>' + el.parcelName + '</td>\n              <td>' + el.presentLocation + '</td>\n              <td>' + el.destination + '</td>\n              <td>' + el.status + '</td>\n              <td>\n                  <div class="btn-group-action">\n                      <button data-id="' + el.orderId + '" id="btn-details">details</button>\n                      <button data-id="' + el.orderId + '" id="btn-edit">edit</button>\n                      <button data-id="' + el.orderId + '" id="btn-cancel">cancel</button>\n                  </div>\n              </td>\n          </tr>\n          ';
        });
      }
    } else {
      if (result.body.authKeyMissed) {
        alert('Auth Missed');
        window.location.href = "index.html";
      } else if (result.body.authKeyInvalid) {
        alert('Auth Invalid');
        window.location.href = "index.html";
      }
    }
  });
});