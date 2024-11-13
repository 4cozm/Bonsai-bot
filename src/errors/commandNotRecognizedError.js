class CommandNotRecognizedError extends CustomError {
  constructor(command, message = '알 수 없는 명령어') {
    super(message);
    this.command = command;
  }
}

export default CommandNotRecognizedError;
