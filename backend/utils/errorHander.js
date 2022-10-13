//node error handler
// we use this class so we pass it error message and status code
//we use this in middleware error.js
class ErrorHander extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    //error.stack field that gives you a stack trace showing where the error came from.
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = ErrorHander;
