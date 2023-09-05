"use strict";

/**
 * user-group controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::user-group.user-group",
  ({ strapi }) => ({
    async find() {
      return await strapi.service("api::user-group.user-group").findMany();
    },
  })
);
