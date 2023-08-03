"use strict";

/**
 * holiday controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::holiday.holiday", ({ strapi }) => ({
  async getHolidaysByUserEmail(ctx) {
    return await strapi
      .service("api::holiday.holiday")
      .findHolidaysByUserEmail(ctx);
  },
  async find() {
    return await strapi.service("api::holiday.holiday").findMany();
  },
}));
