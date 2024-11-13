import CustomError from './customError.js';

class ValidationError extends CustomError {
  constructor(field, message = '유효성 검사 실패') {
    super(message);
    this.field = field;
  }
}

export default ValidationError;
