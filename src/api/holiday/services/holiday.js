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
  async findHolidaysByGroup(ctx) {
    let res = [];

    const group = await strapi.db.query("api::group.group").findOne({
      where: {
        id: {
          $eq: ctx?.params?.id,
        },
      },
    });

    const users = await strapi.db
      .query("plugin::users-permissions.user")
      .findMany({
        where: {
          groups: {
            id: {
              $eq: group?.id,
            },
          },
        },
      });

    for (const user of users) {
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
      if (holidays.length > 0) {
        res.push(holidays);
      }
    }

    return res;

    /*
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
    */
  },
  async findMany() {
    return await strapi.db.query("api::holiday.holiday").findMany({
      populate: populateBuilder(strapi, "api::holiday.holiday"),
    });
  },
}));
