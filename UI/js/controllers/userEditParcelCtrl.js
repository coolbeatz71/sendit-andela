// get HTML element
const btnEditParcel = document.querySelector('#btn-save');

// get the query string
let queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);
const params = queryString.split('&');
const parcelId = params.toString().split('=')[1];

btnEditParcel.addEventListener('click', (e) => {
  e.preventDefault();
  let newDestination = document.querySelector('#to').value;

  if (!newDestination) {
    swal('Oops', 'The new destination is required', 'error');
    newDestination = '';
  } else {

  }
});
