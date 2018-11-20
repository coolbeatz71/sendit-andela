/* eslint-disable */
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
const linkTransitParcels = document.getElementById('link-transit-parcels');
const linkDeliveredParcels = document.getElementById('link-delivered-parcels');
const linkCancelledParcels = document.getElementById('link-cancelled-parcels');

const allParcels = document.getElementById('all-parcels');
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
  setDisplay(transitParcels, 'none');
  setDisplay(deliveredParcels, 'none');
  setDisplay(cancelledParcels, 'none');
};

const setTransitParcel = () => {
  setDisplay(allParcels, 'none');
  setDisplay(transitParcels, 'block');
  setDisplay(deliveredParcels, 'none');
  setDisplay(cancelledParcels, 'none');
};

const setDeliveredParcel = () => {
  setDisplay(allParcels, 'none');
  setDisplay(transitParcels, 'none');
  setDisplay(deliveredParcels, 'block');
  setDisplay(cancelledParcels, 'none');
};

const setCancelledParcel = () => {
  setDisplay(allParcels, 'none');
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
  });
});

window.addEventListener('load', () => {
  isElementExist(allParcels, () => { setDisplay(allParcels, 'block'); });
  isElementExist(transitParcels, () => { setDisplay(transitParcels, 'none'); });
  isElementExist(deliveredParcels, () => { setDisplay(deliveredParcels, 'none'); });
  isElementExist(cancelledParcels, () => { setDisplay(cancelledParcels, 'none'); });
});

isElementExist(linkTransitParcels, () => {
  linkTransitParcels.addEventListener('click', () => {
    setTransitParcel();
  });
});

isElementExist(linkDeliveredParcels, () => {
  linkDeliveredParcels.addEventListener('click', () => {
    setDeliveredParcel();
  });
});

isElementExist(linkCancelledParcels, () => {
  linkCancelledParcels.addEventListener('click', () => {
    setCancelledParcel();
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
