const modal = document.querySelector('#modal-sign-up');
const btnStart = document.querySelector('.btn-start');
const btnClose = document.querySelector('.btn-close-modal');
const gotoSignUp = document.querySelector('#goto-sign-up');
const gotoSignIn = document.querySelector('#goto-sign-in');
const signUpForm = document.querySelector('#sign-up-form');
const signInForm = document.querySelector('#sign-in-form');
const signInLink = document.querySelector('#sign-in-link');
const btnCreateParcel = document.querySelectorAll('.btn-create');

const btnDetail = document.querySelectorAll('#btn-details');
const btnEdit = document.querySelectorAll('#btn-edit');
const btnCancel = document.querySelectorAll('#btn-cancel');
const btnEditAdmin = document.querySelectorAll('#btn-edit-admin');

const linkAllParcels = document.getElementById('link-all-parcels');
const linkPendingParcels = document.getElementById('link-pending-parcels');
const linkTransitParcels = document.getElementById('link-transit-parcels');
const linkDeliveredParcels = document.getElementById('link-delivered-parcels');
const linkCancelledParcels = document.getElementById('link-cancelled-parcels');

const allParcels = document.getElementById('all-parcels');
const pendingParcels = document.getElementById('pending-parcels');
const transitParcels = document.getElementById('transit-parcels');
const deliveredParcels = document.getElementById('delivered-parcels');
const cancelledParcels = document.getElementById('cancelled-parcels');

const signInAdmin = document.querySelector('#sign-in-admin');
const signInFormAdmin = document.querySelector('#sign-in-form-admin');

// logout
const btnLogout = document.querySelector('#logout');

/*
    check if an element is in the DOM
    @params element
    @params callback
 */
const isElementExist = (element, callback) => {
  if (typeof (element) !== 'undefined' && element != null) {
    callback();
  }
};

/**
 * change the display of an HTML element
 * @param  DOM element
 * @param  string value
 */
const setDisplay = (element, value) => {
  element.style.display = value;
};

/*
    * open a modal page
 */
const openModal = () => {
  setDisplay(modal, 'block');
};

/**
 * display the sign up modal page
 */
const _gotoSignUp = () => {
  setDisplay(signUpForm, 'block');
  setDisplay(signInForm, 'none');
  setDisplay(signInFormAdmin, 'none');
};

/**
 * display the sign in modal page
 */
const _gotoSignIn = () => {
  setDisplay(signInForm, 'block');
  setDisplay(signUpForm, 'none');
  setDisplay(signInFormAdmin, 'none');
};

const _gotoSignInAdmin = () => {
  setDisplay(signInFormAdmin, 'block');
  setDisplay(signInForm, 'none');
  setDisplay(signUpForm, 'none');
};

const setAllParcel = () => {
  setDisplay(allParcels, 'block');
  setDisplay(pendingParcels, 'none');
  setDisplay(transitParcels, 'none');
  setDisplay(deliveredParcels, 'none');
  setDisplay(cancelledParcels, 'none');
};

const setPendingParcel = () => {
  setDisplay(allParcels, 'none');
  setDisplay(pendingParcels, 'block');
  setDisplay(transitParcels, 'none');
  setDisplay(deliveredParcels, 'none');
  setDisplay(cancelledParcels, 'none');
};

const setTransitParcel = () => {
  setDisplay(allParcels, 'none');
  setDisplay(pendingParcels, 'none');
  setDisplay(transitParcels, 'block');
  setDisplay(deliveredParcels, 'none');
  setDisplay(cancelledParcels, 'none');
};

const setDeliveredParcel = () => {
  setDisplay(allParcels, 'none');
  setDisplay(pendingParcels, 'none');
  setDisplay(transitParcels, 'none');
  setDisplay(deliveredParcels, 'block');
  setDisplay(cancelledParcels, 'none');
};

const setCancelledParcel = () => {
  setDisplay(allParcels, 'none');
  setDisplay(pendingParcels, 'none');
  setDisplay(transitParcels, 'none');
  setDisplay(deliveredParcels, 'none');
  setDisplay(cancelledParcels, 'block');
};

isElementExist(btnCreateParcel, () => {
  btnCreateParcel.forEach((el) => {
    el.addEventListener('click', () => {
      openModal();
    });
  });
});

isElementExist(linkAllParcels, () => {
  linkAllParcels.addEventListener('click', () => {
    setAllParcel();
    tableAllParcels.innerHTML = '';
    const parcel = new Parcel();
    parcel.getAllParcelByUser()
      .then((result) => {
        if (result.status === 'success') {
          if (!result.parcel.length) {
            tableAllParcels.innerHTML = `
              <tr>
                <td colspan='6'>
                <h3 class="no-data">Nothing to display</h3>  
                </td>
              </tr>`;
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
});

window.addEventListener('load', () => {
  isElementExist(allParcels, () => { setDisplay(allParcels, 'block'); });
  isElementExist(pendingParcels, () => { setDisplay(pendingParcels, 'none'); });
  isElementExist(transitParcels, () => { setDisplay(transitParcels, 'none'); });
  isElementExist(deliveredParcels, () => { setDisplay(deliveredParcels, 'none'); });
  isElementExist(cancelledParcels, () => { setDisplay(cancelledParcels, 'none'); });
});

isElementExist(linkTransitParcels, () => {
  linkTransitParcels.addEventListener('click', (e) => {
    e.preventDefault();
    setTransitParcel();
    tableTransitParcel.innerHTML = '';
    const parcel = new Parcel();
    parcel.getAllParcelByUser()
      .then((result) => {
        if (result.status === 'success') {
          if (!result.parcel.length) {
            tableTransitParcel.innerHTML = `
              <tr>
                <td colspan='6'>
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
            } else {
              tableTransitParcel.innerHTML += `
              <tr>
                <td colspan='6'>
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
});

isElementExist(linkPendingParcels, () => {
  linkPendingParcels.addEventListener('click', () => {
    setPendingParcel();
    tablePendingParcel.innerHTML = '';
    const parcel = new Parcel();
    parcel.getAllParcelByUser()
      .then((result) => {
        if (result.status === 'success') {
          if (!result.parcel.length) {
            tablePendingParcel.innerHTML = `
              <tr>
                <td colspan='6'>
                  <h3 class="no-data">Nothing to display</h3>  
                </td>
              </tr>`;
          } else {
            const parcels = result.parcel;
            const pendingOrder = parcels.filter(el => el.status === 'pending');
            if (pendingOrder.length > 0) {
              pendingOrder.forEach((el) => {
                tablePendingParcel.innerHTML += `
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
            } else {
              tablePendingParcel.innerHTML += `
              <tr>
                <td colspan='6'>
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
});

isElementExist(linkDeliveredParcels, () => {
  linkDeliveredParcels.addEventListener('click', () => {
    setDeliveredParcel();
    tableDeliveredParcel.innerHTML = '';
    const parcel = new Parcel();
    parcel.getAllParcelByUser()
      .then((result) => {
        if (result.status === 'success') {
          if (!result.parcel.length) {
            tableDeliveredParcel.innerHTML = `
              <tr>
                <td colspan='6'>
                  <h3 class="no-data">Nothing to display</h3>  
                </td>
              </tr>`;
          } else {
            const parcels = result.parcel;
            const deliveredOrder = parcels.filter(el => el.status === 'delivered');
            if (deliveredOrder.length > 0) {
              deliveredOrder.forEach((el) => {
                tableDeliveredParcel.innerHTML += `
                    <tr>
                      <td>${el.id_parcel}</td>
                      <td>${el.parcel_name}</td>
                      <td>${el.pickup_location}</td>
                      <td>${el.destination}</td>
                      <td>${el.status}</td>
                      <td>
                          <div class="btn-group-action">
                              <button data-id="${el.id_parcel}" onclick="getParcelDetailUser(this)" id="btn-details">details</button>
                          </div>
                      </td>
                    </tr>
                  `;
              });
            } else {
              tableDeliveredParcel.innerHTML += `
              <tr>
                <td colspan='6'>
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
});

isElementExist(linkCancelledParcels, () => {
  linkCancelledParcels.addEventListener('click', () => {
    setCancelledParcel();
    tableCancelledParcel.innerHTML = '';
    const parcel = new Parcel();
    parcel.getAllParcelByUser()
      .then((result) => {
        if (result.status === 'success') {
          if (!result.parcel.length) {
            tableCancelledParcel.innerHTML = `
              <tr>
                <td colspan='6'>
                  <h3 class="no-data">Nothing to display</h3>  
                </td>
              </tr>`;
          } else {
            const parcels = result.parcel;
            const cancelledOrder = parcels.filter(el => el.status === 'cancelled');
            if (cancelledOrder.length > 0) {
              cancelledOrder.forEach((el) => {
                tableCancelledParcel.innerHTML += `
                    <tr>
                      <td>${el.id_parcel}</td>
                      <td>${el.parcel_name}</td>
                      <td>${el.pickup_location}</td>
                      <td>${el.destination}</td>
                      <td>${el.status}</td>
                    </tr>
                  `;
              });
            } else {
              tableCancelledParcel.innerHTML += `
              <tr>
                <td colspan='6'>
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
});

isElementExist(btnStart, () => {
  btnStart.addEventListener('click', () => {
    // open the modal
    openModal();

    // and the signUp form
    _gotoSignUp();
  });
});

isElementExist(btnClose, () => {
  btnClose.addEventListener('click', () => {
    setDisplay(modal, 'none');
  });
});

isElementExist(signInLink, () => {
  signInLink.addEventListener('click', () => {
    // open the modal
    openModal();

    // and the signIn form
    _gotoSignIn();
  });
});

isElementExist(gotoSignIn, () => {
  gotoSignIn.addEventListener('click', () => {
    _gotoSignIn();
  });
});

isElementExist(gotoSignUp, () => {
  gotoSignUp.addEventListener('click', () => {
    _gotoSignUp();
  });
});

window.addEventListener('click', (e) => {
  isElementExist(modal, () => {
    if (e.target == modal) {
      setDisplay(modal, 'none');
    }
  });
});

isElementExist(signInAdmin, () => {
  signInAdmin.addEventListener('click', () => {
    // open the modal
    openModal();

    // and the signIn form admin
    _gotoSignInAdmin();
  });
});

/**
 * fetch parcel details for one user
 * @param HTMLElement target
 */
const getParcelDetailUser = (target) => {
  const parcelId = target.dataset.id;
  window.location.href = `parcelDetail.html?parcelId=${parcelId}`;
};

/**
 * edit parcel for one user (destination)
 * @param HTMLElement target
 */
const editParcelUser = (target) => {
  const parcelId = target.dataset.id;
  window.location.href = `editParcel.html?parcelId=${parcelId}`;
};

/**
 * cancel a parcel for a user
 * @param  HTML element target
 */
const cancelParcelUser = (target) => {
  const parcelId = target.dataset.id;
  const parcel = new Parcel();

  if (!Number.isInteger(parseInt(parcelId, 10))) {
    swal('Oops!!', 'The parcel id must be a number', 'error');
  } else {
    swal('Are you sure you want to cancel this parcel delivery order?', {
      buttons: ['No', true],
    }).then((value) => {
      if (value) {
        parcel.cancelParcel(parcelId)
          .then((result) => {
            if (result.status === 'success') {
              swal('Success', 'parcel delivery order successfully cancelled', 'success')
                .then(() => {
                  window.location.href = 'userProfile.html';
                });
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
      }
    });
  }
};

btnLogout.addEventListener('click', (e) => {
  e.preventDefault();
  swal('Are you sure you want to log out?', {
    buttons: ['No', true],
  }).then((value) => {
    if (value) {
      localStorage.removeItem('apiKey');
      window.location.href = 'index.html';
    }
  });
});
