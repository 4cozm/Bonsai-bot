class ESIRequestError extends CustomError {
  constructor(endpoint, message = 'ESI API 요청 실패') {
    super(message);
    this.endpoint = endpoint;
  }
}

export default ESIRequestError;
