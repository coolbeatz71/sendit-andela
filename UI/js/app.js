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

isElementExist(btnDetail, () => {
  btnDetail.forEach((el) => {
    el.addEventListener('click', () => {
      console.log(window.location.href);
      // may look for a way of sending params in urls
      window.location.href = 'parcelDetail.html';
    });
  });
});

isElementExist(btnEdit, () => {
  btnEdit.forEach((el) => {
    el.addEventListener('click', () => {
      console.log(window.location.href);
      // may look for a way of sending params in urls
      window.location.href = 'editParcel.html';
    });
  });
});

isElementExist(btnEditAdmin, () => {
  btnEditAdmin.forEach((el) => {
    el.addEventListener('click', () => {
      console.log(window.location.href);
      // may look for a way of sending params in urls
      window.location.href = 'adminEditParcel.html';
    });
  });
});

isElementExist(btnCancel, () => {
  btnCancel.forEach((el) => {
    el.addEventListener('click', () => {
      alert('It may cancel the delivery order');
    });
  });
});

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
        if (!result.body.error) {
          if (!result.body.data) {
            tableTransitParcel.innerHTML = `
              <h3 class="no-data">Nothing to display</h3>  
            `;
          } else {
            const parcels = result.body.data;
            const transitOrder = parcels.filter(el => el.status === 'in transit');
            if (transitOrder.length > 0) {
              transitOrder.forEach((el) => {
                tableTransitParcel.innerHTML += `
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
            } else {
              tableTransitParcel.innerHTML += `
                  <h3>Nothing to display</h3>
                `;
            }
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
});

isElementExist(linkPendingParcels, () => {
  linkPendingParcels.addEventListener('click', () => {
    setPendingParcel();
    tableDeliveredParcel.innerHTML = '';
    const parcel = new Parcel();
    parcel.getAllParcelByUser()
      .then((result) => {
        if (!result.body.error) {
          if (!result.body.data) {
            tableDeliveredParcel.innerHTML = `
              <h3 class="no-data">Nothing to display</h3>  
            `;
          } else {
            const parcels = result.body.data;
            const deliveredOrder = parcels.filter(el => el.status === 'delivered');
            if (deliveredOrder.length > 0) {
              deliveredOrder.forEach((el) => {
                tableDeliveredParcel.innerHTML += `
                    <tr>
                      <td>${el.orderId}</td>
                      <td>${el.parcelName}</td>
                      <td>${el.presentLocation}</td>
                      <td>${el.destination}</td>
                      <td>${el.status}</td>
                      <td>
                          <div class="btn-group-action">
                              <button data-id="${el.orderId}" id="btn-details">details</button>
                          </div>
                      </td>
                  </tr>
                  `;
              });
            } else {
              tableDeliveredParcel.innerHTML += `
                  <h3>Nothing to display</h3>
                `;
            }
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
});

isElementExist(linkDeliveredParcels, () => {
  linkDeliveredParcels.addEventListener('click', () => {
    setDeliveredParcel();
    tableDeliveredParcel.innerHTML = '';
    const parcel = new Parcel();
    parcel.getAllParcelByUser()
      .then((result) => {
        if (!result.body.error) {
          if (!result.body.data) {
            tableDeliveredParcel.innerHTML = `
              <h3 class="no-data">Nothing to display</h3>  
            `;
          } else {
            const parcels = result.body.data;
            const deliveredOrder = parcels.filter(el => el.status === 'delivered');
            if (deliveredOrder.length > 0) {
              deliveredOrder.forEach((el) => {
                tableDeliveredParcel.innerHTML += `
                    <tr>
                      <td>${el.orderId}</td>
                      <td>${el.parcelName}</td>
                      <td>${el.presentLocation}</td>
                      <td>${el.destination}</td>
                      <td>${el.status}</td>
                      <td>
                          <div class="btn-group-action">
                              <button data-id="${el.orderId}" id="btn-details">details</button>
                          </div>
                      </td>
                  </tr>
                  `;
              });
            } else {
              tableDeliveredParcel.innerHTML += `
                  <h3>Nothing to display</h3>
                `;
            }
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
});

isElementExist(linkCancelledParcels, () => {
  linkCancelledParcels.addEventListener('click', () => {
    setCancelledParcel();
    tableCancelledParcel.innerHTML = '';
    const parcel = new Parcel();
    parcel.getAllParcelByUser()
      .then((result) => {
        if (!result.body.error) {
          if (!result.body.data) {
            tableCancelledParcel.innerHTML = `
              <h3 class="no-data">Nothing to display</h3>  
            `;
          } else {
            const parcels = result.body.data;
            const cancelledOrder = parcels.filter(el => el.status === 'cancelled');
            if (cancelledOrder.length > 0) {
              cancelledOrder.forEach((el) => {
                tableCancelledParcel.innerHTML += `
                    <tr>
                      <td>${el.orderId}</td>
                      <td>${el.parcelName}</td>
                      <td>${el.presentLocation}</td>
                      <td>${el.destination}</td>
                      <td>${el.status}</td>
                  </tr>
                  `;
              });
            } else {
              tableCancelledParcel.innerHTML += `
                  <h3>Nothing to display</h3>
                `;
            }
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
