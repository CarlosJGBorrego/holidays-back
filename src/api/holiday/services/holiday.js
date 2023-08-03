"use strict";

const { populateBuilder } = require("../../../utils/populate");

/**
 * holiday service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::holiday.holiday", ({ strapi }) => ({
  async findHolidaysByUserEmail(ctx) {
    const user = await strapi.db
      .query("plugin::users-permissions.user")
      .findOne({
        where: {
          email: {
            $eq: ctx?.params?.email,
          },
        },
      });

    const holidays = await strapi.db.query("api::holiday.holiday").findMany({
      where: {
        user: {
          id: {
            $eq: user?.id,
          },
        },
      },
      populate: populateBuilder(strapi, "api::holiday.holiday"),
    });

    return holidays;
  },
  async findMany() {
    return await strapi.db.query("api::holiday.holiday").findMany({
      populate: populateBuilder(strapi, "api::holiday.holiday"),
    });
  },
}));
