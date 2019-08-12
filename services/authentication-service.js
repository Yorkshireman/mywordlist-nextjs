import AbstractService from './abstract-service';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { AUTHENTICATION_SERVER_BASE_URL } = publicRuntimeConfig;

class AuthenticationService extends AbstractService {
  constructor(baseUrl) {
    super(baseUrl);
  }

  async signUp({ email, password, username }) {
    const body = new URLSearchParams({
      'email': email,
      'name': username,
      'password': password
    });

    await this.call({
      body,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      path: '/auth/register'
    });
  }
}

export default new AuthenticationService(AUTHENTICATION_SERVER_BASE_URL);
