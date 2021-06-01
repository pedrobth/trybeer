const statusMsgMap = {
  allFieldsMustBeFilled: {
    status: 400, message: 'All fields must be filled', error: true,
  },
  authMiddlewareError: {
    status: 401, message: 'jwt malformed', error: true,
  },
  created: {
    status: 201,
  },
  dbSearchReturnedEmpty: {
    status: 404, message: 'user not found', error: true,
  },
  deleted: {
    status: 204, message: null,
  },
  emailInDatabase: {
    status: 409, message: 'Email already registered', error: true,
  },
  emailNotRegistered: {
    status: 401, message: 'Incorrect username or password', error: true,
  },
  missingAuthToken: {
    status: 401, message: 'missing auth token', error: true,
  },
  missingFields: {
    status: 400, message: 'Invalid entries. Try again.', error: true,
  },
  missingToken: {
    status: 401, message: 'jwt malformed', error: true,
  },
  OK: {
    status: 200, message: false,
  },
  permissionDenied: {
    status: 401, message: 'User does not have permission', error: true,
  },
  wrongInput: {
    status: 400, message: 'Invalid entries. Try again.', error: true,
  },
  wrongPassword: {
    status: 401, message: 'Incorrect username or password', error: true,
  },
  errorInDb: {
    status: 500, message: 'Bad db connection || query', error: true,
  },
};

module.exports = statusMsgMap;
