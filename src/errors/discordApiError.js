import customError from './customError.js';

class discordAPIError extends customError {
  constructor(action, message = 'Discord API 요청 실패') {
    super(message);
    this.action = action;
  }
}
export default discordAPIError;
