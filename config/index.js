'use strict';

require('dotenv').config();

module.exports = {
  DB: process.env.APP_DB,
  PORT: process.env.APP_PORT || 3333,
  SECRET: process.env.APP_SECRET,
};
