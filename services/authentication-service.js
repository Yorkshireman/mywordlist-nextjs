import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { AUTHENTICATION_SERVER_BASE_URL } = publicRuntimeConfig;

const AuthenticationService = {
  signUp: async formParams => {
    const { email, password, username } = formParams;
    const path = '/auth/register';
    const url = `${AUTHENTICATION_SERVER_BASE_URL}${path}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        'email': email,
        'name': username,
        'password': password
      })
    });

    if (!response.ok) {
      const error = new Error();
      const message = await response.text();
      error.message = `${response.status}, ${message}`;
      throw error;
    }
  }
};

export default AuthenticationService;
