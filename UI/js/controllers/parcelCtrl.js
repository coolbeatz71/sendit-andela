const parcelNumber = document.querySelector('.parcel-number');
const tableAllParcels = document.querySelector('#table-all-parcel');
const tablePendingParcel = document.querySelector('#table-pending-parcel');
const tableDeliveredParcel = document.querySelector('#table-delivered-parcel');
const tableTransitParcel = document.querySelector('#table-transit-parcel');
const tableCancelledParcel = document.querySelector('#table-cancelled-parcel');

window.addEventListener('load', () => {
  const parcel = new Parcel();

  // ////////////////////
  // Number of parcel //
  // ////////////////////
  parcel.countParcelByUser()
    .then((result) => {
      console.log(result);
      // Display the number of parcels per category
      if (!result.body.error) {
        parcelNumber.innerHTML = `
        <li class="numbers" id="all">All parcels: <span>${result.body.data.all}</span></li>
        <li class="numbers" id="pending">Pending: <span>${result.body.data.pending}</span></li>
        <li class="numbers" id="delivered">Delivered: <span>${result.body.data.delivered}</span></li>
        <li class="numbers" id="transit">In transit: <span>${result.body.data.inTransit}</span></li>
        <li class="numbers" id="cancelled">Cancelled: <span>${result.body.data.cancelled}</span></li>  
      `;
      } else if (result.body.authKeyMissed) {
        alert('Auth Missed');
        window.location.href = 'index.html';
      } else if (result.body.authKeyInvalid) {
        alert('Auth Invalid');
        window.location.href = 'index.html';
      }
    });

  // ///////////////////////
  // Display all parcels //
  // ///////////////////////
  parcel.getAllParcelByUser()
    .then((result) => {
      if (!result.body.error) {
        if (!result.body.data) {
          tableAllParcels.innerHTML = `
        <h3 class="no-data">Nothing to display</h3>  
      `;
        } else {
          const parcels = result.body.data;
          parcels.forEach((el) => {
            tableAllParcels.innerHTML += `
            <tr>
              <td>${el.orderId}</td>
              <td>${el.parcelName}</td>
              <td>${el.presentLocation}</td>
              <td>${el.destination}</td>
              <td>${el.status}</td>
              <td>
                  <div class="btn-group-action">
                      <button data-id="${el.orderId}" id="btn-details">details</button>
                      <button data-id="${el.orderId}" id="btn-edit">edit</button>
                      <button data-id="${el.orderId}" id="btn-cancel">cancel</button>
                  </div>
              </td>
          </tr>
          `;
          });
        }
      } else if (result.body.authKeyMissed) {
        alert('Auth Missed');
        window.location.href = 'index.html';
      } else if (result.body.authKeyInvalid) {
        alert('Auth Invalid');
        window.location.href = 'index.html';
      }
    });
});
