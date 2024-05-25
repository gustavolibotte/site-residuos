"use strict";

/**
 *  captacao-de-receptor controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::captacao-de-receptor.captacao-de-receptor",
  ({ strapi }) => ({
    async create(ctx) {
      try {
        const response = await strapi
          .service("api::captacao-de-receptor.captacao-de-receptor")
          .create({
            ...ctx.request.body,
          });

        return await strapi.entityService.update(
          "api::captacao-de-receptor.captacao-de-receptor",
          response.id,
          {
            ...ctx.request.body,
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
        const query = ctx.request.query;
        const catadorCategory = await strapi.db
          .query("api::categoria.categoria")
          .findOne({
            where: {
              nome: "Catador",
            },
          });
        const resuduos = await strapi.db
          .query("api::captacao-de-receptor.captacao-de-receptor")
          .findMany(
            {
              where: {
                cidade: query.cidade,
                residuos: query.residuos,
                aprovado: true,
              },
              populate: { categoria: true },
            },
          );
        return resuduos.filter((residuo) => {
          return !(residuo.categoria.id == catadorCategory.id);
        });
      } catch (err) {
        console.log(err);
        ctx.response.status = 500;
        return {
          error: { message: "Erro no servidor tente mais tarde" },
        };
      }
    },
  })
);
