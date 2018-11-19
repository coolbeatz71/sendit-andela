'use strict';

/* eslint-disable */
var modal = document.querySelector('#modal-sign-up');
var btnStart = document.querySelector('.btn-start');
var btnClose = document.querySelector('.btn-close-modal');
var gotoSignUp = document.querySelector('#goto-sign-up');
var gotoSignIn = document.querySelector('#goto-sign-in');
var signUpForm = document.querySelector('#sign-up-form');
var signInForm = document.querySelector('#sign-in-form');
var signInLink = document.querySelector('#sign-in-link');
var btnCreateParcel = document.querySelectorAll('.btn-create');

var btnDetail = document.querySelectorAll('#btn-details');
var btnEdit = document.querySelectorAll('#btn-edit');
var btnCancel = document.querySelectorAll('#btn-cancel');
var btnEditAdmin = document.querySelectorAll('#btn-edit-admin');

var linkAllParcels = document.getElementById('link-all-parcels');
var linkTransitParcels = document.getElementById('link-transit-parcels');
var linkDeliveredParcels = document.getElementById('link-delivered-parcels');
var linkCancelledParcels = document.getElementById('link-cancelled-parcels');

var allParcels = document.getElementById('all-parcels');
var transitParcels = document.getElementById('transit-parcels');
var deliveredParcels = document.getElementById('delivered-parcels');
var cancelledParcels = document.getElementById('cancelled-parcels');

var signInAdmin = document.querySelector('#sign-in-admin');
var signInFormAdmin = document.querySelector('#sign-in-form-admin');

/*
    check if an element is in the DOM
    @params element
    @params callback
 */
var isElementExist = function isElementExist(element, callback) {
  if (typeof element !== 'undefined' && element != null) {
    callback();
  }
};

/**
 * change the display of an HTML element
 * @param  DOM element
 * @param  string value
 */
var setDisplay = function setDisplay(element, value) {
  element.style.display = value;
};

/*
    * open a modal page
 */
var openModal = function openModal() {
  setDisplay(modal, 'block');
};

/**
 * display the sign up modal page
 */
var _gotoSignUp = function _gotoSignUp() {
  setDisplay(signUpForm, 'block');
  setDisplay(signInForm, 'none');
  setDisplay(signInFormAdmin, 'none');
};

/**
 * display the sign in modal page
 */
var _gotoSignIn = function _gotoSignIn() {
  setDisplay(signInForm, 'block');
  setDisplay(signUpForm, 'none');
  setDisplay(signInFormAdmin, 'none');
};

var _gotoSignInAdmin = function _gotoSignInAdmin() {
  setDisplay(signInFormAdmin, 'block');
  setDisplay(signInForm, 'none');
  setDisplay(signUpForm, 'none');
};

var setAllParcel = function setAllParcel() {
  setDisplay(allParcels, 'block');
  setDisplay(transitParcels, 'none');
  setDisplay(deliveredParcels, 'none');
  setDisplay(cancelledParcels, 'none');
};

var setTransitParcel = function setTransitParcel() {
  setDisplay(allParcels, 'none');
  setDisplay(transitParcels, 'block');
  setDisplay(deliveredParcels, 'none');
  setDisplay(cancelledParcels, 'none');
};

var setDeliveredParcel = function setDeliveredParcel() {
  setDisplay(allParcels, 'none');
  setDisplay(transitParcels, 'none');
  setDisplay(deliveredParcels, 'block');
  setDisplay(cancelledParcels, 'none');
};

var setCancelledParcel = function setCancelledParcel() {
  setDisplay(allParcels, 'none');
  setDisplay(transitParcels, 'none');
  setDisplay(deliveredParcels, 'none');
  setDisplay(cancelledParcels, 'block');
};

isElementExist(btnDetail, function () {
  btnDetail.forEach(function (el) {
    el.addEventListener('click', function () {
      console.log(window.location.href);
      // may look for a way of sending params in urls
      window.location.href = 'parcelDetail.html';
    });
  });
});

isElementExist(btnEdit, function () {
  btnEdit.forEach(function (el) {
    el.addEventListener('click', function () {
      console.log(window.location.href);
      // may look for a way of sending params in urls
      window.location.href = 'editParcel.html';
    });
  });
});

isElementExist(btnEditAdmin, function () {
  btnEditAdmin.forEach(function (el) {
    el.addEventListener('click', function () {
      console.log(window.location.href);
      // may look for a way of sending params in urls
      window.location.href = 'adminEditParcel.html';
    });
  });
});

isElementExist(btnCancel, function () {
  btnCancel.forEach(function (el) {
    el.addEventListener('click', function () {
      alert('It may cancel the delivery order');
    });
  });
});

isElementExist(btnCreateParcel, function () {
  btnCreateParcel.forEach(function (el) {
    el.addEventListener('click', function () {
      openModal();
    });
  });
});

isElementExist(linkAllParcels, function () {
  linkAllParcels.addEventListener('click', function () {
    setAllParcel();
  });
});

window.addEventListener('load', function () {
  isElementExist(allParcels, function () {
    setDisplay(allParcels, 'block');
  });
  isElementExist(transitParcels, function () {
    setDisplay(transitParcels, 'none');
  });
  isElementExist(deliveredParcels, function () {
    setDisplay(deliveredParcels, 'none');
  });
  isElementExist(cancelledParcels, function () {
    setDisplay(cancelledParcels, 'none');
  });
});

isElementExist(linkTransitParcels, function () {
  linkTransitParcels.addEventListener('click', function () {
    setTransitParcel();
  });
});

isElementExist(linkDeliveredParcels, function () {
  linkDeliveredParcels.addEventListener('click', function () {
    setDeliveredParcel();
  });
});

isElementExist(linkCancelledParcels, function () {
  linkCancelledParcels.addEventListener('click', function () {
    setCancelledParcel();
  });
});

isElementExist(btnStart, function () {
  btnStart.addEventListener('click', function () {
    // open the modal
    openModal();

    // and the signUp form
    _gotoSignUp();
  });
});

isElementExist(btnClose, function () {
  btnClose.addEventListener('click', function () {
    setDisplay(modal, 'none');
  });
});

isElementExist(signInLink, function () {
  signInLink.addEventListener('click', function () {
    // open the modal
    openModal();

    // and the signIn form
    _gotoSignIn();
  });
});

isElementExist(gotoSignIn, function () {
  gotoSignIn.addEventListener('click', function () {
    _gotoSignIn();
  });
});

isElementExist(gotoSignUp, function () {
  gotoSignUp.addEventListener('click', function () {
    _gotoSignUp();
  });
});

window.addEventListener('click', function (e) {
  isElementExist(modal, function () {
    if (e.target == modal) {
      setDisplay(modal, 'none');
    }
  });
});

isElementExist(signInAdmin, function () {
  signInAdmin.addEventListener('click', function () {
    // open the modal
    openModal();

    // and the signIn form admin
    _gotoSignInAdmin();
  });
});