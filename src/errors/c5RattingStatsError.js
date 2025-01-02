import customError from './customError.js';

class c5RattingStatsError extends customError {
  constructor(message = '5클조업 통계 오류') {
    super(message);
  }
}

export default c5RattingStatsError;
