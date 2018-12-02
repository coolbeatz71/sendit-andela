'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var constants = {
  USER: 'user_role',
  ADMIN: 'admin_role',
  EMAIL_EXIST: 'email_exist',
  INVALID_EMAIL: 'email_invalid',
  INVALID_PASSWORD: 'password_invalid',

  DEFAULT_STATUS: {
    pending: 'pending',
    transit: 'in transit',
    delivered: 'delivered',
    cancelled: 'cancelled'
  },
  NO_ENTRY: 'no_entry',
  JWT_SECRET_TOKEN: 'andela@sigmacool'
};

exports.default = constants;