class DiscordAPIError extends CustomError {
    constructor(action, message = 'Discord API 요청 실패') {
      super(message);
      this.action = action;
    }
  }