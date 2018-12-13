'use strict';

// admin profile
var adminLinkAllParcels = document.getElementById('admin-link-all-parcels');
var adminLinkPendingParcels = document.getElementById('admin-link-pending-parcels');
var adminLinkTransitParcels = document.getElementById('admin-link-transit-parcels');
var adminLinkDeliveredParcels = document.getElementById('admin-link-delivered-parcels');
var adminLinkCancelledParcels = document.getElementById('admin-link-cancelled-parcels');

var parcelNumber = document.querySelector('.parcel-number');
var tableAllParcel = document.querySelector('#table-all-parcel');
var tablePendingParcel = document.querySelector('#table-pending-parcel');
var tableDeliveredParcel = document.querySelector('#table-delivered-parcel');
var tableTransitParcel = document.querySelector('#table-transit-parcel');
var tableCancelledParcel = document.querySelector('#table-cancelled-parcel');

// Event to get all parcels in transit for all users
adminLinkTransitParcels.addEventListener('click', function (e) {
  e.preventDefault();
  setTransitParcel();
  tableTransitParcel.innerHTML = '';
  var parcel = new Parcel();
  parcel.getAllParcel().then(function (result) {
    if (result.status === 'success') {
      if (!result.parcel.length) {
        tableTransitParcel.innerHTML = '\n              <tr>\n                <td colspan=\'7\'>\n                <h3 class="no-data">Nothing to display</h3>  \n                </td>\n              </tr>';
      } else {
        var parcels = result.parcel;
        var transitOrder = parcels.filter(function (el) {
          return el.status === 'in transit';
        });
        if (transitOrder.length > 0) {
          transitOrder.forEach(function (el) {
            tableTransitParcel.innerHTML += '\n                    <tr>\n                      <td>' + el.id_user + '</td>\n                      <td>' + el.id_parcel + '</td>\n                      <td>' + el.parcel_name + '</td>\n                      <td>' + el.pickup_location + '</td>\n                      <td>' + el.destination + '</td>\n                      <td>' + el.status + '</td>\n                      <td>\n                          <div class="btn-group-action">\n                              <button data-id-user="' + el.id_user + '" data-id-parcel="' + el.id_parcel + '" id="btn-details">details</button>\n                              <button data-id-user="' + el.id_user + '" data-id-parcel="' + el.id_parcel + '" id="btn-edit">edit</button>\n                              <button data-id-user="' + el.id_user + '" data-id-parcel="' + el.id_parcel + '" id="btn-cancel">cancel</button>\n                          </div>\n                      </td>\n                    </tr>\n                  ';
          });
        } else {
          tableTransitParcel.innerHTML += '\n              <tr>\n                <td colspan=\'7\'>\n                  <h3 class="no-data">Nothing to display</h3>  \n                </td>\n              </tr>';
        }
      }
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
});

// Event to get all parcels in pending for all users
adminLinkPendingParcels.addEventListener('click', function (e) {
  e.preventDefault();
  setPendingParcel();
  tablePendingParcel.innerHTML = '';
  var parcel = new Parcel();
  parcel.getAllParcel().then(function (result) {
    if (result.status === 'success') {
      if (!result.parcel.length) {
        tablePendingParcel.innerHTML = '\n              <tr>\n                <td colspan=\'7\'>\n                <h3 class="no-data">Nothing to display</h3>  \n                </td>\n              </tr>';
      } else {
        var parcels = result.parcel;
        var transitOrder = parcels.filter(function (el) {
          return el.status === 'pending';
        });
        if (transitOrder.length > 0) {
          transitOrder.forEach(function (el) {
            tablePendingParcel.innerHTML += '\n                    <tr>\n                      <td>' + el.id_user + '</td>\n                      <td>' + el.id_parcel + '</td>\n                      <td>' + el.parcel_name + '</td>\n                      <td>' + el.pickup_location + '</td>\n                      <td>' + el.destination + '</td>\n                      <td>' + el.status + '</td>\n                      <td>\n                          <div class="btn-group-action">\n                              <button data-id-user="' + el.id_user + '" data-id-parcel="' + el.id_parcel + '" id="btn-details">details</button>\n                              <button data-id-user="' + el.id_user + '" data-id-parcel="' + el.id_parcel + '" id="btn-edit">edit</button>\n                              <button data-id-user="' + el.id_user + '" data-id-parcel="' + el.id_parcel + '" id="btn-cancel">cancel</button>\n                          </div>\n                      </td>\n                    </tr>\n                  ';
          });
        } else {
          tablePendingParcel.innerHTML += '\n              <tr>\n                <td colspan=\'7\'>\n                  <h3 class="no-data">Nothing to display</h3>  \n                </td>\n              </tr>';
        }
      }
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
});

// Event to get all delivered parcels for all users
adminLinkDeliveredParcels.addEventListener('click', function (e) {
  e.preventDefault();
  setDeliveredParcel();
  tableDeliveredParcel.innerHTML = '';
  var parcel = new Parcel();
  parcel.getAllParcel().then(function (result) {
    if (result.status === 'success') {
      if (!result.parcel.length) {
        tableDeliveredParcel.innerHTML = '\n              <tr>\n                <td colspan=\'7\'>\n                <h3 class="no-data">Nothing to display</h3>  \n                </td>\n              </tr>';
      } else {
        var parcels = result.parcel;
        var transitOrder = parcels.filter(function (el) {
          return el.status === 'delivered';
        });
        if (transitOrder.length > 0) {
          transitOrder.forEach(function (el) {
            tableDeliveredParcel.innerHTML += '\n                    <tr>\n                      <td>' + el.id_user + '</td>\n                      <td>' + el.id_parcel + '</td>\n                      <td>' + el.parcel_name + '</td>\n                      <td>' + el.pickup_location + '</td>\n                      <td>' + el.destination + '</td>\n                      <td>' + el.status + '</td>\n                      <td>\n                          <div class="btn-group-action">\n                              <button data-id-user="' + el.id_user + '" data-id-parcel="' + el.id_parcel + '" id="btn-details">details</button>\n                              <button data-id-user="' + el.id_user + '" data-id-parcel="' + el.id_parcel + '" id="btn-edit">edit</button>\n                              <button data-id-user="' + el.id_user + '" data-id-parcel="' + el.id_parcel + '" id="btn-cancel">cancel</button>\n                          </div>\n                      </td>\n                    </tr>\n                  ';
          });
        } else {
          tableDeliveredParcel.innerHTML += '\n              <tr>\n                <td colspan=\'7\'>\n                  <h3 class="no-data">Nothing to display</h3>  \n                </td>\n              </tr>';
        }
      }
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
});

// Event to get all cancelled parcels for all users
adminLinkCancelledParcels.addEventListener('click', function (e) {
  e.preventDefault();
  setCancelledParcel();
  tableCancelledParcel.innerHTML = '';
  var parcel = new Parcel();
  parcel.getAllParcel().then(function (result) {
    if (result.status === 'success') {
      if (!result.parcel.length) {
        tableCancelledParcel.innerHTML = '\n              <tr>\n                <td colspan=\'7\'>\n                <h3 class="no-data">Nothing to display</h3>  \n                </td>\n              </tr>';
      } else {
        var parcels = result.parcel;
        var transitOrder = parcels.filter(function (el) {
          return el.status === 'delivered';
        });
        if (transitOrder.length > 0) {
          transitOrder.forEach(function (el) {
            tableCancelledParcel.innerHTML += '\n                    <tr>\n                      <td>' + el.id_user + '</td>\n                      <td>' + el.id_parcel + '</td>\n                      <td>' + el.parcel_name + '</td>\n                      <td>' + el.pickup_location + '</td>\n                      <td>' + el.destination + '</td>\n                      <td>' + el.status + '</td>\n                      <td>\n                          <div class="btn-group-action">\n                              <button data-id-user="' + el.id_user + '" data-id-parcel="' + el.id_parcel + '" id="btn-details">details</button>\n                              <button data-id-user="' + el.id_user + '" data-id-parcel="' + el.id_parcel + '" id="btn-edit">edit</button>\n                              <button data-id-user="' + el.id_user + '" data-id-parcel="' + el.id_parcel + '" id="btn-cancel">cancel</button>\n                          </div>\n                      </td>\n                    </tr>\n                  ';
          });
        } else {
          tableCancelledParcel.innerHTML += '\n              <tr>\n                <td colspan=\'7\'>\n                  <h3 class="no-data">Nothing to display</h3>  \n                </td>\n              </tr>';
        }
      }
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
});

// Event to get all parcels for all users
adminLinkAllParcels.addEventListener('click', function (e) {
  e.preventDefault();
  setAllParcel();
  tableAllParcel.innerHTML = '';
  var parcel = new Parcel();
  parcel.getAllParcel().then(function (result) {
    if (result.status === 'success') {
      if (result.parcel.length === 0) {
        tableAllParcel.innerHTML = '\n          <tr>\n            <td colspan=\'7\'>\n            <h3 class="no-data">Nothing to display</h3>  \n            </td>\n          </tr>\n      ';
      } else {
        var parcels = result.parcel;
        parcels.forEach(function (el) {
          tableAllParcel.innerHTML += '\n            <tr>\n              <td>' + el.id_user + '</td>\n              <td>' + el.id_parcel + '</td>\n              <td>' + el.parcel_name + '</td>\n              <td>' + el.pickup_location + '</td>\n              <td>' + el.destination + '</td>\n              <td>' + el.status + '</td>\n              <td>\n                  <div class="btn-group-action">\n                      <button data-id-user="' + el.id_user + '" data-id-parcel="' + el.id_parcel + '" id="btn-details">details</button>\n                      <button data-id-user="' + el.id_user + '" data-id-parcel="' + el.id_parcel + '" id="btn-edit">edit</button>\n                      <button data-id-user="' + el.id_user + '" data-id-parcel="' + el.id_parcel + '" id="btn-cancel">cancel</button>\n                  </div>\n              </td>\n          </tr>\n          ';
        });
      }
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
});

// count all parcels for all users
window.addEventListener('load', function () {
  var parcel = new Parcel();

  // ////////////////////
  // Number of parcel //
  // ////////////////////
  parcel.countParcelByAdmin().then(function (result) {
    console.log(result);
    // Display the number of parcels per category
    if (result.status === 'success') {
      parcelNumber.innerHTML = '\n        <li class="numbers" id="all">All parcels: <span>' + result.parcel.all + '</span></li>\n        <li class="numbers" id="pending">Pending: <span>' + result.parcel.pending + '</span></li>\n        <li class="numbers" id="delivered">Delivered: <span>' + result.parcel.delivered + '</span></li>\n        <li class="numbers" id="transit">In transit: <span>' + result.parcel.inTransit + '</span></li>\n        <li class="numbers" id="cancelled">Cancelled: <span>' + result.parcel.cancelled + '</span></li>  \n      ';
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

  // ///////////////////////
  // All parcels by users //
  // ///////////////////////
  parcel.getAllParcel().then(function (result) {
    if (result.status === 'success') {
      if (result.parcel.length === 0) {
        tableAllParcel.innerHTML = '\n          <tr>\n            <td colspan=\'7\'>\n            <h3 class="no-data">Nothing to display</h3>  \n            </td>\n          </tr>\n      ';
      } else {
        var parcels = result.parcel;
        parcels.forEach(function (el) {
          tableAllParcel.innerHTML += '\n            <tr>\n              <td>' + el.id_user + '</td>\n              <td>' + el.id_parcel + '</td>\n              <td>' + el.parcel_name + '</td>\n              <td>' + el.pickup_location + '</td>\n              <td>' + el.destination + '</td>\n              <td>' + el.status + '</td>\n              <td>\n                  <div class="btn-group-action">\n                      <button data-id-user="' + el.id_user + '" data-id-parcel="' + el.id_parcel + '" id="btn-details">details</button>\n                      <button data-id-user="' + el.id_user + '" data-id-parcel="' + el.id_parcel + '" id="btn-edit">edit</button>\n                      <button data-id-user="' + el.id_user + '" data-id-parcel="' + el.id_parcel + '" id="btn-cancel">cancel</button>\n                  </div>\n              </td>\n          </tr>\n          ';
        });
      }
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
});