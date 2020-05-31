import AbstractService from './abstract-service';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { RESOURCES_SERVER_BASE_URL } = publicRuntimeConfig;

class ResourcesService extends AbstractService {
  constructor(baseUrl) {
    super(baseUrl);
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

  async createWordlistEntry({ description, name, token }) {
    const body = JSON.stringify({
      wordlist_entry: {
        word: {
          name
        },
        description
      }
    });

    return await this.call({
      body,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/vnd.api+json'
      },
      method: 'POST',
      path: '/wordlist_entries'
    });

    // throw new Error;
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

  async getWordlistEntries(token) {
    return await this.call({
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/vnd.api+json'
      },
      method: 'GET',
      path: '/wordlist_entries'
    });
  }
}

export default new ResourcesService(RESOURCES_SERVER_BASE_URL);
