'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var constants = {
  USER: 'user_role',
  ADMIN: 'admin_role',
  EMAIL_EXIST: 1,
  INVALID_EMAIL: 2,
  INVALID_PASSWORD: 3,

  DEFAULT_STATUS: {
    pending: 'pending',
    transit: 'in transit',
    delivered: 'delivered',
    cancelled: 'cancelled'
  }
};

exports.default = constants;