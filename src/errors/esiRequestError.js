import customError from './customError.js';

class esiRequestError extends customError {
  constructor(endpoint, message = 'ESI API 요청 실패') {
    super(message);
    this.endpoint = endpoint;
  }
}

export default esiRequestError;
