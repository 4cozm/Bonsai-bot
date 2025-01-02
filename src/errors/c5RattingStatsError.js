import customError from './customError.js';

class c5RattingStatsError extends customError {
  constructor(data, message = '5클조업 통계 오류') {
    super(message);
    this.data = data;
  }
}

export default c5RattingStatsError;
