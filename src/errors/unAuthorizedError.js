import CustomError from './customError.js';

class unAuthorizedError extends CustomError {
  constructor(action, message = '인증되지 않은 동작입니다') {
    super(message);
    this.action = action;
  }
}

export default unAuthorizedError;
