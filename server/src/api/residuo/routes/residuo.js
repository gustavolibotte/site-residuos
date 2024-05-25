"use strict";

/**
 * residuo router.
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::residuo.residuo", {
  config: {
    find: {
      auth: false,
    },
  },
});
