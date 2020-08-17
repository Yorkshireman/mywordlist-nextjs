import AbstractService from './abstract-service';
import getConfig from 'next/config';
import ValidationError from '../errors/validation-error';

const { publicRuntimeConfig } = getConfig();
const { RESOURCES_SERVER_BASE_URL } = publicRuntimeConfig;

class ResourcesService extends AbstractService {
  constructor(baseUrl) {
    super(baseUrl);
  }

  async addCategories({ categories, token, wordlistEntryId }) {
    if (!categories || !categories.length) throw new ValidationError('no categories provided');
    if (!wordlistEntryId) throw new ValidationError('wordlistEntryId undefined');

    const body = JSON.stringify({
      categories,
      token
    });

    return await this.call({
      body,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/vnd.api+json'
      },
      method: 'POST',
      path: `/wordlist_entries/${wordlistEntryId}/categories`
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

  async createWordlistEntry({ description, id, name, token }) {
    const body = JSON.stringify({
      wordlist_entry: {
        word: {
          name
        },
        description,
        id
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
