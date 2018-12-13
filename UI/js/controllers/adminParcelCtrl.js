// admin profile
const adminLinkAllParcels = document.getElementById('admin-link-all-parcels');
const adminLinkPendingParcels = document.getElementById('admin-link-pending-parcels');
const adminLinkTransitParcels = document.getElementById('admin-link-transit-parcels');
const adminLinkDeliveredParcels = document.getElementById('admin-link-delivered-parcels');
const adminLinkCancelledParcels = document.getElementById('admin-link-cancelled-parcels');

const parcelNumber = document.querySelector('.parcel-number');
const tableAllParcel = document.querySelector('#table-all-parcel');
const tablePendingParcel = document.querySelector('#table-pending-parcel');
const tableDeliveredParcel = document.querySelector('#table-delivered-parcel');
const tableTransitParcel = document.querySelector('#table-transit-parcel');
const tableCancelledParcel = document.querySelector('#table-cancelled-parcel');

// Event to get all parcels in transit for all users
adminLinkTransitParcels.addEventListener('click', (e) => {
  e.preventDefault();
  setTransitParcel();
  tableTransitParcel.innerHTML = '';
  const parcel = new Parcel();
  parcel.getAllParcel()
    .then((result) => {
      if (result.status === 'success') {
        if (!result.parcel.length) {
          tableTransitParcel.innerHTML = `
              <tr>
                <td colspan='7'>
                <h3 class="no-data">Nothing to display</h3>  
                </td>
              </tr>`;
        } else {
          const parcels = result.parcel;
          const transitOrder = parcels.filter(el => el.status === 'in transit');
          if (transitOrder.length > 0) {
            transitOrder.forEach((el) => {
              tableTransitParcel.innerHTML += `
                    <tr>
                      <td>${el.id_user}</td>
                      <td>${el.id_parcel}</td>
                      <td>${el.parcel_name}</td>
                      <td>${el.pickup_location}</td>
                      <td>${el.destination}</td>
                      <td>${el.status}</td>
                      <td>
                          <div class="btn-group-action">
                              <button data-id-user="${el.id_user}" data-id-parcel="${el.id_parcel}" id="btn-details">details</button>
                              <button data-id-user="${el.id_user}" data-id-parcel="${el.id_parcel}" id="btn-edit">edit</button>
                              <button data-id-user="${el.id_user}" data-id-parcel="${el.id_parcel}" id="btn-cancel">cancel</button>
                          </div>
                      </td>
                    </tr>
                  `;
            });
          } else {
            tableTransitParcel.innerHTML += `
              <tr>
                <td colspan='7'>
                  <h3 class="no-data">Nothing to display</h3>  
                </td>
              </tr>`;
          }
        }
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
});

// Event to get all parcels in pending for all users
adminLinkPendingParcels.addEventListener('click', (e) => {
  e.preventDefault();
  setPendingParcel();
  tablePendingParcel.innerHTML = '';
  const parcel = new Parcel();
  parcel.getAllParcel()
    .then((result) => {
      if (result.status === 'success') {
        if (!result.parcel.length) {
          tablePendingParcel.innerHTML = `
              <tr>
                <td colspan='7'>
                <h3 class="no-data">Nothing to display</h3>  
                </td>
              </tr>`;
        } else {
          const parcels = result.parcel;
          const transitOrder = parcels.filter(el => el.status === 'pending');
          if (transitOrder.length > 0) {
            transitOrder.forEach((el) => {
              tablePendingParcel.innerHTML += `
                    <tr>
                      <td>${el.id_user}</td>
                      <td>${el.id_parcel}</td>
                      <td>${el.parcel_name}</td>
                      <td>${el.pickup_location}</td>
                      <td>${el.destination}</td>
                      <td>${el.status}</td>
                      <td>
                          <div class="btn-group-action">
                              <button data-id-user="${el.id_user}" data-id-parcel="${el.id_parcel}" id="btn-details">details</button>
                              <button data-id-user="${el.id_user}" data-id-parcel="${el.id_parcel}" id="btn-edit">edit</button>
                              <button data-id-user="${el.id_user}" data-id-parcel="${el.id_parcel}" id="btn-cancel">cancel</button>
                          </div>
                      </td>
                    </tr>
                  `;
            });
          } else {
            tablePendingParcel.innerHTML += `
              <tr>
                <td colspan='7'>
                  <h3 class="no-data">Nothing to display</h3>  
                </td>
              </tr>`;
          }
        }
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
});

// Event to get all delivered parcels for all users
adminLinkDeliveredParcels.addEventListener('click', (e) => {
  e.preventDefault();
  setDeliveredParcel();
  tableDeliveredParcel.innerHTML = '';
  const parcel = new Parcel();
  parcel.getAllParcel()
    .then((result) => {
      if (result.status === 'success') {
        if (!result.parcel.length) {
          tableDeliveredParcel.innerHTML = `
              <tr>
                <td colspan='7'>
                <h3 class="no-data">Nothing to display</h3>  
                </td>
              </tr>`;
        } else {
          const parcels = result.parcel;
          const transitOrder = parcels.filter(el => el.status === 'delivered');
          if (transitOrder.length > 0) {
            transitOrder.forEach((el) => {
              tableDeliveredParcel.innerHTML += `
                    <tr>
                      <td>${el.id_user}</td>
                      <td>${el.id_parcel}</td>
                      <td>${el.parcel_name}</td>
                      <td>${el.pickup_location}</td>
                      <td>${el.destination}</td>
                      <td>${el.status}</td>
                      <td>
                          <div class="btn-group-action">
                              <button data-id-user="${el.id_user}" data-id-parcel="${el.id_parcel}" id="btn-details">details</button>
                              <button data-id-user="${el.id_user}" data-id-parcel="${el.id_parcel}" id="btn-edit">edit</button>
                              <button data-id-user="${el.id_user}" data-id-parcel="${el.id_parcel}" id="btn-cancel">cancel</button>
                          </div>
                      </td>
                    </tr>
                  `;
            });
          } else {
            tableDeliveredParcel.innerHTML += `
              <tr>
                <td colspan='7'>
                  <h3 class="no-data">Nothing to display</h3>  
                </td>
              </tr>`;
          }
        }
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
});

// Event to get all cancelled parcels for all users
adminLinkCancelledParcels.addEventListener('click', (e) => {
  e.preventDefault();
  setCancelledParcel();
  tableCancelledParcel.innerHTML = '';
  const parcel = new Parcel();
  parcel.getAllParcel()
    .then((result) => {
      if (result.status === 'success') {
        if (!result.parcel.length) {
          tableCancelledParcel.innerHTML = `
              <tr>
                <td colspan='7'>
                <h3 class="no-data">Nothing to display</h3>  
                </td>
              </tr>`;
        } else {
          const parcels = result.parcel;
          const transitOrder = parcels.filter(el => el.status === 'delivered');
          if (transitOrder.length > 0) {
            transitOrder.forEach((el) => {
              tableCancelledParcel.innerHTML += `
                    <tr>
                      <td>${el.id_user}</td>
                      <td>${el.id_parcel}</td>
                      <td>${el.parcel_name}</td>
                      <td>${el.pickup_location}</td>
                      <td>${el.destination}</td>
                      <td>${el.status}</td>
                      <td>
                          <div class="btn-group-action">
                              <button data-id-user="${el.id_user}" data-id-parcel="${el.id_parcel}" id="btn-details">details</button>
                              <button data-id-user="${el.id_user}" data-id-parcel="${el.id_parcel}" id="btn-edit">edit</button>
                              <button data-id-user="${el.id_user}" data-id-parcel="${el.id_parcel}" id="btn-cancel">cancel</button>
                          </div>
                      </td>
                    </tr>
                  `;
            });
          } else {
            tableCancelledParcel.innerHTML += `
              <tr>
                <td colspan='7'>
                  <h3 class="no-data">Nothing to display</h3>  
                </td>
              </tr>`;
          }
        }
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
});

// Event to get all parcels for all users
adminLinkAllParcels.addEventListener('click', (e) => {
  e.preventDefault();
  setAllParcel();
  tableAllParcel.innerHTML = '';
  const parcel = new Parcel();
  parcel.getAllParcel()
    .then((result) => {
      if (result.status === 'success') {
        if (result.parcel.length === 0) {
          tableAllParcel.innerHTML = `
          <tr>
            <td colspan='7'>
            <h3 class="no-data">Nothing to display</h3>  
            </td>
          </tr>
      `;
        } else {
          const parcels = result.parcel;
          parcels.forEach((el) => {
            tableAllParcel.innerHTML += `
            <tr>
              <td>${el.id_user}</td>
              <td>${el.id_parcel}</td>
              <td>${el.parcel_name}</td>
              <td>${el.pickup_location}</td>
              <td>${el.destination}</td>
              <td>${el.status}</td>
              <td>
                  <div class="btn-group-action">
                      <button data-id-user="${el.id_user}" data-id-parcel="${el.id_parcel}" id="btn-details">details</button>
                      <button data-id-user="${el.id_user}" data-id-parcel="${el.id_parcel}" id="btn-edit">edit</button>
                      <button data-id-user="${el.id_user}" data-id-parcel="${el.id_parcel}" id="btn-cancel">cancel</button>
                  </div>
              </td>
          </tr>
          `;
          });
        }
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
});

// count all parcels for all users
window.addEventListener('load', () => {
  const parcel = new Parcel();

  // ////////////////////
  // Number of parcel //
  // ////////////////////
  parcel.countParcelByAdmin()
    .then((result) => {
      console.log(result);
      // Display the number of parcels per category
      if (result.status === 'success') {
        parcelNumber.innerHTML = `
        <li class="numbers" id="all">All parcels: <span>${result.parcel.all}</span></li>
        <li class="numbers" id="pending">Pending: <span>${result.parcel.pending}</span></li>
        <li class="numbers" id="delivered">Delivered: <span>${result.parcel.delivered}</span></li>
        <li class="numbers" id="transit">In transit: <span>${result.parcel.inTransit}</span></li>
        <li class="numbers" id="cancelled">Cancelled: <span>${result.parcel.cancelled}</span></li>  
      `;
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

  // ///////////////////////
  // All parcels by users //
  // ///////////////////////
  parcel.getAllParcel()
    .then((result) => {
      if (result.status === 'success') {
        if (result.parcel.length === 0) {
          tableAllParcel.innerHTML = `
          <tr>
            <td colspan='7'>
            <h3 class="no-data">Nothing to display</h3>  
            </td>
          </tr>
      `;
        } else {
          const parcels = result.parcel;
          parcels.forEach((el) => {
            tableAllParcel.innerHTML += `
            <tr>
              <td>${el.id_user}</td>
              <td>${el.id_parcel}</td>
              <td>${el.parcel_name}</td>
              <td>${el.pickup_location}</td>
              <td>${el.destination}</td>
              <td>${el.status}</td>
              <td>
                  <div class="btn-group-action">
                      <button data-id-user="${el.id_user}" data-id-parcel="${el.id_parcel}" id="btn-details">details</button>
                      <button data-id-user="${el.id_user}" data-id-parcel="${el.id_parcel}" id="btn-edit">edit</button>
                      <button data-id-user="${el.id_user}" data-id-parcel="${el.id_parcel}" id="btn-cancel">cancel</button>
                  </div>
              </td>
          </tr>
          `;
          });
        }
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
});
