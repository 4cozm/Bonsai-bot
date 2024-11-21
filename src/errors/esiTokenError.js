import customError from './customError.js';

class esiTokenError extends customError {
  constructor(message = 'ESI 토큰 오류: 재인증 필요') {
    super(message);
  }
}

export default esiTokenError;
