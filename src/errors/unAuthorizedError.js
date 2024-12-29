import customError from './customError.js';

class unAuthorizedError extends customError {
  constructor(action, message = '인증되지 않은 동작입니다') {
    super(message);
    this.action = action;
  }
}

export default unAuthorizedError;
