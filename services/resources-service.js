import AbstractService from './abstract-service';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { RESOURCES_SERVER_BASE_URL } = publicRuntimeConfig;

class ResourcesService extends AbstractService {
  constructor(baseUrl) {
    super(baseUrl);
  }

  async createWordlistEntry(token, word) {
    return await this.call({
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/vnd.api+json'
      },
      method: 'POST',
      path: '/wordlist-entries'
    });
  }

  async createWordlist(token) {
    return await this.call({
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/vnd.api+json'
      },
      method: 'POST',
      path: '/wordlists'
    });
  }

  async getWordlist(token) {
    return await this.call({
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/vnd.api+json'
      },
      method: 'GET',
      path: '/wordlist'
    });
  }
}

export default new ResourcesService(RESOURCES_SERVER_BASE_URL);
