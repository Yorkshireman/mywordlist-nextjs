import getConfig from 'next/config';
import ServiceCaller from '../utils/service-caller';

const { publicRuntimeConfig } = getConfig();
const { AUTHENTICATION_SERVER_BASE_URL } = publicRuntimeConfig;

const AuthenticationService = {
  signUp: async formParams => {
    const { email, password, username } = formParams;
    const service = {
      body: new URLSearchParams({
        'email': email,
        'name': username,
        'password': password
      }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      url: `${AUTHENTICATION_SERVER_BASE_URL}/auth/register`
    };

    const serviceCaller = new ServiceCaller(service);
    await serviceCaller.callService();
  }
};

export default AuthenticationService;
