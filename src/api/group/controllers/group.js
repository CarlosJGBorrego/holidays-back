"use strict";

/**
 * group controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::group.group", ({ strapi }) => ({
  async findGroupsByUser(ctx) {
    return await strapi.service("api::group.group").findGroupsByUser(ctx);
  },
  async find() {
    return await strapi.service("api::group.group").findMany();
  },
}));
