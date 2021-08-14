if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

module.exports = {
  publicRuntimeConfig: {
    AUTHENTICATION_SERVER_BASE_URL: process.env.AUTHENTICATION_SERVER_BASE_URL,
    RESOURCES_SERVER_BASE_URL: process.env.RESOURCES_SERVER_BASE_URL
  }
};
