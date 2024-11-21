import customError from './customError.js';

class databaseError extends customError {
  constructor(action, message = '데이터베이스에서 에러 발생') {
    super(message);
    this.action = action;
  }
}
export default databaseError;
