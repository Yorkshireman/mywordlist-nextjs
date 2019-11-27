import AbstractService from './abstract-service';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { AUTHENTICATION_SERVER_BASE_URL } = publicRuntimeConfig;

class AuthenticationService extends AbstractService {
  constructor(baseUrl) {
    super(baseUrl);
  }

  async signIn({ email, password }) {
    const body = JSON.stringify({
      user: {
        email,
        password
      }
    });

    return await this.call({
      body,
      headers: { 'Content-Type': 'application/vnd.api+json' },
      method: 'POST',
      path: '/signin'
    });
  }

  async signUp({ email, password, username: name }) {
    const body = JSON.stringify({
      user: {
        email,
        name,
        password
      }
    });

    return await this.call({
      body,
      headers: { 'Content-Type': 'application/vnd.api+json' },
      method: 'POST',
      path: '/signup'
    });
  }
}

export default new AuthenticationService(AUTHENTICATION_SERVER_BASE_URL);
