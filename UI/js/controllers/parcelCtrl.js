const parcelNumber = document.querySelector('.parcel-number');
const tableAllParcels = document.querySelector('#table-all-parcel');
const tablePendingParcel = document.querySelector('#table-pending-parcel');
const tableDeliveredParcel = document.querySelector('#table-delivered-parcel');
const tableTransitParcel = document.querySelector('#table-transit-parcel');
const tableCancelledParcel = document.querySelector('#table-cancelled-parcel');

// create parcel
const btnSendOrder = document.querySelector('#btn-send-order');
const inputWeight = document.getElementById('weight');
const inputPrice = document.getElementById('price');


// retrieve parcel delivery orders list
window.addEventListener('load', () => {
  const parcel = new Parcel();

  // ////////////////////
  // Number of parcel //
  // ////////////////////
  parcel.countParcelByUser()
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
  // Display all parcels //
  // ///////////////////////
  parcel.getAllParcelByUser()
    .then((result) => {
      if (result.status === 'success') {
        if (result.parcel.length === 0) {
          tableAllParcels.innerHTML = `
          <tr>
            <td colspan='6'>
            <h3 class="no-data">Nothing to display</h3>  
            </td>
          </tr>
      `;
        } else {
          const parcels = result.parcel;
          parcels.forEach((el) => {
            tableAllParcels.innerHTML += `
            <tr>
              <td>${el.id_parcel}</td>
              <td>${el.parcel_name}</td>
              <td>${el.pickup_location}</td>
              <td>${el.destination}</td>
              <td>${el.status}</td>
              <td>
                <div class="btn-group-action">
                  <button data-id="${el.id_parcel}" onclick="getParcelDetailUser(this)" id="btn-details">details</button>
                  <button data-id="${el.id_parcel}" onclick="editParcelUser(this)" id="btn-edit">edit</button>
                  <button data-id="${el.id_parcel}" onclick="cancelParcelUser(this)" id="btn-cancel">cancel</button>
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

// create parcel
btnSendOrder.addEventListener('click', (e) => {
  e.preventDefault();
  // create new parcel delivery order
  let parcelName = document.getElementById('parcelName').value.trim();
  let description = document.getElementById('desc').value.trim();
  let pickupLocation = document.getElementById('from').value.trim();
  let destination = document.getElementById('to').value.trim();
  let weight = inputWeight.value;
  const price = inputPrice.value;
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
    const parcel = new Parcel();
    parcel.createParcel(parcelName, description, pickupLocation, destination, weight)
      .then((result) => {
        console.log(result);
        if (result.status === 'success') {
          swal('Success', 'Parcel created successfully', 'success')
            .then((value) => {
              window.location.href = 'userProfile.html';
            });
          parcelName = '';
          description = '';
          pickupLocation = '';
          destination = '';
          weight = '';
        } else if (result.status === 'fail') {
          swal('Oops!!', `${result.message}`, 'error');
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
inputWeight.addEventListener('input', () => {
  const unitPrice = 500;
  inputPrice.value = `${inputWeight.value * unitPrice} Rwf`;
});
