import RemoteServiceError from '../errors/remote-service-error';
import ValidationError from '../errors/validation-error';

class ServiceCaller {
  constructor(service) {
    const { body, headers, method, url } = service;
    if (!method || !url) {
      throw new ValidationError('method or url null/undefined.');
    }

    this.service = { body, headers, method, url };
  }

  async callService() {
    const { body, headers, method, url } = this.service;
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
};

export default ServiceCaller;
