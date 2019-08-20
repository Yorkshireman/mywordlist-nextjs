import RemoteServiceError from '../errors/remote-service-error';
import ValidationError from '../errors/validation-error';

export default class AbstractService {
  constructor(baseUrl) {
    if (!baseUrl) {
      throw new ValidationError('baseUrl null/undefined.');
    }

    this.baseUrl = baseUrl;
  }

  async call({ body, headers, method, path }) {
    const url = `${this.baseUrl}${path}`;
    const response = await fetch(url, {
      body,
      headers,
      method
    });

    if (!response.ok) {
      const message = await response.text();
      throw new RemoteServiceError(response.status, message);
    }
  }
}
