'use strict';

/**
 * captacao-de-receptor router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter(
  "api::captacao-de-receptor.captacao-de-receptor",
  {
    config: {
      create: {
        auth: false,
      },
      find: {
        auth: false,
      },
    },
  }
);
