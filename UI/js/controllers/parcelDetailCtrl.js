// get HTML elements
const tableInfo = document.querySelector('#info');

// get the query string
let queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);
const params = queryString.split('&');
const parcelId = params.toString().split('=')[1];

if (!Number.isInteger(parseInt(parcelId, 10))) {
  swal('Oops!!', 'The parcel id must be a number', 'error');
}

// get the parcel details for a user
window.addEventListener('load', () => {
  const parcel = new Parcel();

  parcel.getParcelById(parcelId)
    .then((result) => {
      if (result.status === 'success') {
        tableInfo.innerHTML += `
          <tr>
            <th>Id N°</th>
            <td>${result.parcel[0].id_parcel}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>${result.parcel[0].parcel_name}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>${result.parcel[0].description}</td>
          </tr>
          <tr>
            <th>Location</th>
            <td>${result.parcel[0].pickup_location}</td>
          </tr>
          <tr>
            <th>Destination</th>
            <td>${result.parcel[0].destination}</td>
          </tr>
          <tr>
            <th>Present Location</th>
            <td>${result.parcel[0].present_location}</td>
          </tr>
          <tr>
            <th>Weight</th>
            <td>${result.parcel[0].weight} Kg</td>
          </tr>
          <tr>
            <th>Price</th>
            <td>${result.parcel[0].price} Rwf</td>
          </tr>
        `;
      } else if (result.status === 'fail') {
        swal('Oops!!', `${result.message}`, 'error');
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
