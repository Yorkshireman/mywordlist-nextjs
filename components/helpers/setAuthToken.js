export const setAuthToken = async token => {
  if (typeof token !== 'string') {
    throw 'token is not a String';
  }

  window.localStorage.setItem('myWordlistAuthToken', token);
  return token;
};
