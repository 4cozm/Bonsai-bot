import customError from './customError.js';

class dataNotFoundError extends customError {
  constructor(resource, message = '정보를 찾지 못했습니다') {
    super(message);
    this.resource = resource;
  }
}

export default dataNotFoundError;
