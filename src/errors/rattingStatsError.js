import customError from './customError.js';

class rattingStatsError extends customError {
  constructor(data, message = '5클조업 통계 오류') {
    super(message);
    this.data = data;
  }
}

export default rattingStatsError;
