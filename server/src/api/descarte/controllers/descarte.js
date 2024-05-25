"use strict";

/**
 *  descarte controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::descarte.descarte",
  ({ strapi }) => ({
    async create(ctx) {
      try {
        const { body } = ctx.request;
        const response = await strapi.service("api::descarte.descarte").create({
          ...body,
        });
        return await strapi.entityService.update(
          "api::descarte.descarte",
          response.id,
          {
            ...body,
          }
        );
      } catch (err) {
        console.log(err);
        ctx.response.status = 500;
        return {
          error: { message: "Erro no servidor tente mais tarde" },
        };
      }
    },

    async find(ctx) {
      try {
        const { user } = ctx.state;
        return await strapi.db.query("api::descarte.descarte").findMany({
          where: {
            user,
          },
          populate: true,
        });
      } catch (error) {
        console.log(err);
        ctx.response.status = 500;
        return {
          error: { message: "Erro no servidor tente mais tarde" },
        };
      }
    },
  })
);
