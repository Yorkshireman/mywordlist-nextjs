export default class RemoteServiceError extends Error {
  constructor(status, message) {
    super(`${status}, ${message}`);
    this.name = 'RemoteServiceError';
  }
}
