export default class RemoteServiceError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = 'RemoteServiceError';
    this.statusCode = statusCode;
  }
}
