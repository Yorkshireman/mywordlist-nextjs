if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  publicRuntimeConfig: {
    AUTHENTICATION_SERVER_BASE_URL: process.env.AUTHENTICATION_SERVER_BASE_URL,
    RESOURCES_SERVER_BASE_URL: process.env.RESOURCES_SERVER_BASE_URL
  },
  webpack5: false
});
