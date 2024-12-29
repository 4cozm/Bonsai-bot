import customError from './customError.js';

class validationError extends customError {
  constructor(field, message = '유효성 검사 실패') {
    super(message);
    this.field = field;
  }
}

export default validationError;
