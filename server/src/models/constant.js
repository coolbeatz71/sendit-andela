const constants = {
  USER: 'user_role',
  ADMIN: 'admin_role',
  EMAIL_EXIST: 1,
  INVALID_EMAIL: 2,
  INVALID_PASSWORD: 3,

  DEFAULT_STATUS: {
    pending: 'pending',
    transit: 'in transit',
    delivered: 'delivered',
    cancelled: 'cancelled',
  },
};

export default constants;
